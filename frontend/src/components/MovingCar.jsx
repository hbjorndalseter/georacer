import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import '../styles/Map.css';
import Arrow from './Arrow.jsx';
import { calculatePositionOfArrow, calculateDistance } from '../utils/algorithms.js';

export default function Map({ mapId }) {

    const [position, setPosition] = useState([63.4305, 10.3951]);
    const [currentNode, setCurrentNode] = useState(1); // Start node is always 1
    const [neighbours, setNeighbours] = useState([]);
    const [arrowsVisible, setArrowsVisible] = useState(true);
    const [carRotation, setCarRotation] = useState(0);
    const [distance, setDistance] = useState(0);



    // Center the car in the startnode when the map first loads
    useEffect(() => {
        fetch(`http://localhost:3000/api/roadnet/${mapId}/startnode`)
            .then(response => response.json())
            .then(data => {
                console.log(data.lat, data.lng);
                setPosition([data.lat, data.lng]);
            }).catch(error => {
                console.error("Error fetching start node:", error);
            });
    }, [mapId]);

    // Component to center the map on the car using animated panning
    function CenterMap() {
        const map = useMap();
        useEffect(() => {
            map.panTo(position, { animate: true, duration: distance/250 });
        }, [position, map]);
        return null;
    }

    // Get the neighbours of the current node
    useEffect(() => {
        fetch(`http://localhost:3000/api/roadnet/${mapId}/${currentNode}/neighbours`)
            .then(response => response.json())
            .then(data => {
                setNeighbours(data);
                console.log(data)
                setArrowsVisible(true);
            });
    }, [currentNode]);

    // Handle arrow click to move to the neighbour node using built-in animation
    function handleArrowClick(neighbour, rot_angle) {
        setArrowsVisible(false);

        const distance = calculateDistance(neighbour.lat, neighbour.lng, position[0], position[1]);

        setCarRotation(rot_angle + 90);
        setDistance(distance);
        setPosition([neighbour.lat, neighbour.lng]);
        
        // Update the current node after the animation completes
        setTimeout(() => {
            setCurrentNode(neighbour.id);
        }, 4*distance);
    }

    return (
        <div id='container' style={{ position: 'relative', height: '80vh', width: '50%' }}>
            <MapContainer 
                center={position} 
                zoom={18} 
                minZoom={18} 
                style={{ height: '100%', width: '100%' }} 
                dragging={false} 
                zoomControl={false}
            >
                <TileLayer
                    url="https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=6e87f65590d044e99e27369fd99280da"
                    attribution='Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>,
                                 Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                />
                <CenterMap />
                {/* 
                    Denne iterer gjennom spørsmål og rendrer de på kartet
                    {factQuestions.map((q) => (
                        <FactQuestion
                        key={q.id}
                        coords={[q.lat, q.lng]}
                        question={q.question}
                        correctAnswer={q.correctAnswer}
                        onCorrectAnswer={handleCorrectAnswer}
                        />
                ))} */}
            </MapContainer>

            <img src="/redCar.png" className="carSprite" style={{
                transform: `translate(-50%, -50%) rotate(${carRotation}deg)`
            }} />

            {arrowsVisible && neighbours.map((neighbour) => {
                let { rot_angle, x_p, y_p } = calculatePositionOfArrow(
                    neighbour.lat, 
                    neighbour.lng, 
                    position[0], 
                    position[1]
                );
                return (
                    <Arrow
                        key={neighbour.id}
                        rotation_angle={rot_angle}
                        x_position={x_p}
                        y_position={y_p}
                        onClick={() => handleArrowClick(neighbour, rot_angle)}
                    />
                );
            })}
        </div>
    );
}
