import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { use, useEffect, useState } from 'react';
import '../styles/Map.css';
import Arrow from './Arrow';

// Calculate the position of the arrow by finding the angle between two points
function calculatePositionOfArrow(latNeigbour, lonNeighbour, latCurrentNode, lonCurrentNode) {
    console.log(latNeigbour, lonNeighbour, latCurrentNode, lonCurrentNode);
    const dLon = lonNeighbour - lonCurrentNode;
    const dLat = latNeigbour - latCurrentNode;
    const angle = Math.atan(dLon / dLat) * 180 / Math.PI;
    return angle;
}

export default function Map({ mapId }) {
    const [position, setPosition] = useState([63.4305, 10.3951]);
    const [currentNode, setCurrentNode] = useState(1); // Start node is always 1
    const [neighbours, setNeighbours] = useState([]);
    const [arrows, setArrows] = useState([]);

    // Center the car in the startnode when the map first loads
    useEffect(() => {
        fetch(`http://localhost:3000/api/roadnet/${mapId}/startnode`)
            .then(response => response.json())
            .then(data => {
                setPosition([data.lat, data.lng]);
            });
    }, []);

    // Center the map on the car
    function CenterMap() {
        const map = useMap();
        useEffect(() => {
            map.setView(position, map.getZoom());
        }, [position, map]);
        return null;
    }

    // Get the neighbours of the current node
    useEffect(() => {
        fetch(`http://localhost:3000/api/roadnet/${mapId}/${currentNode}/neighbours`)
            .then(response => response.json())
            .then(data => {
                setNeighbours(data);
            });
    }, [currentNode]);


    // When the neighbours are fetched, calculate the angle between the current node and the neighbour and show an arrow
    useEffect(() => {
        neighbours.forEach(neighbour => {
            const angle = calculatePositionOfArrow(neighbour.lat, neighbour.lng, position[0], position[1]);
            setArrows(arrows => [...arrows, { angle }]);
        });
    }, [neighbours]);

    // Handle arrow click to move to the neighbour node
    function handleArrowClick(neighbour) {
        setPosition([neighbour.lat, neighbour.lng]);
        setCurrentNode(neighbour.id);
    }

    return (
        <div id='container' style={{ position: 'relative', height: '80vh', width: '50%' }}>
            <MapContainer center={position} zoom={18} style={{ height: '100%', width: '100%' }} dragging={false} zoomControl={false}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <CenterMap />
            </MapContainer>
            <img src="../../public/redCar.png" className="carSprite" />

            {neighbours.map((neighbour, index) => {
                const angle = calculatePositionOfArrow(neighbour.lat, neighbour.lng, position[0], position[1]);
                return (
                    <Arrow
                        key={index}
                        angle={angle}
                        onClick={() => handleArrowClick(neighbour)}
                    />
                );
            })}
        </div>
    );
}
