import { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, useMap, Marker } from 'react-leaflet';
import { calculatePositionOfArrow, calculateDistance, calculatePanDuration } from '../utils/algorithms.js';
import Arrow from './Arrow.jsx';
import { usePlayer } from '../context/PlayerContext';
import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';

import L from "leaflet";
const glowingQuestionIcon = L.divIcon({
    className: "", // <-- leave this blank
    html: `<div class="custom-marker">❓</div>`,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
});

export default function InteractiveMap({ mapId, checkpointNode, onCheckpointReached, onMove, showArrows }) {

    const [position, setPosition] = useState([63.4305, 10.3951]); // Temporary start, add loading spinner
    const [currentNode, setCurrentNode] = useState(1); // Start node is always 1
    const [neighbours, setNeighbours] = useState([]);
    const [arrowsVisible, setArrowsVisible] = useState(true);
    const [carRotation, setCarRotation] = useState(0);
    const [distanceToNextNode, setDistanceToNextNode] = useState(0);
    const { player } = usePlayer();

    // Center the car in the startnode when the map first loads
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/roadnet/${mapId}/startnode`)
            .then(response => response.json())
            .then(data => {
                setPosition([data.lat, data.lng]);
            }).catch(error => {
                console.error("Error fetching start node:", error);
            });
    }, [mapId]);

    // Component to center the map on the car using animated panning
    function CenterMap() {
        const map = useMap();
        useEffect(() => {
            map.panTo(position, {
                animate: true,
                duration: calculatePanDuration(distanceToNextNode),
            });
        }, [position, map]);
        return null;
    }

    // Get the neighbours of the current node
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/roadnet/${mapId}/${currentNode}/neighbours`)
            .then(response => response.json())
            .then(data => {
                setNeighbours(data);
            });
    }, [currentNode]);

    // Logic to hide the arrows when answering question
    useEffect(() => {
        if (checkpointNode && currentNode === checkpointNode.id) {
            setArrowsVisible(false);
            onCheckpointReached();
        }
        else {
            setArrowsVisible(true);
        }
    }, [neighbours])

    useEffect(() => {
        setArrowsVisible(showArrows)
    }, [showArrows])

    // Angle normalization, always positive between 0 and 360
    function normalize(deg) {
        return (deg + 360) % 360;
    }

    // Handle arrow click to move to the neighbour node using built-in animation
    function handleArrowClick(neighbour, rawRotation) {
        setArrowsVisible(false);

        const offset = 90;
        const prev = normalize(carRotation);
        const target = normalize(rawRotation + offset);

        let delta = target - prev;

        if (delta > 180) delta -= 360;
        if (delta < -180) delta += 360;

        const final = carRotation + delta;
        setCarRotation(final);

        const distance = calculateDistance(neighbour.lat, neighbour.lng, position[0], position[1]);
        onMove(distance); // Update the total distance moved
        setDistanceToNextNode(distance);
        setPosition([neighbour.lat, neighbour.lng]);

        // Update the current node after the animation completes
        setCurrentNode(neighbour.id);
    }

    return (
        <div id='container'>
            <MapContainer
                center={position}
                zoom={18}
                minZoom={18}
                style={{ height: '100%', width: '100%' }}
                dragging={false}
                zoomControl={false}
                doubleClickZoom={false}
            >
                {/* <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution="&copy; OpenStreetMap & CartoDB"
                /> */}
                <TileLayer
                    url="https://api.mapbox.com/styles/v1/aamgrim/cm9sh59tt00ko01s52eqof5f8/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYWFtZ3JpbSIsImEiOiJjbTlzY3d3ZXMwMTV1Mm1zZ3p4NTR2cWc1In0.4u2LSXOHO1_GvcVEjrVTTg"
                    attribution="&copy; Mapbox & OpenStreetMap contributors"
                />
                <CenterMap />
                {checkpointNode && (
                    <Marker position={[checkpointNode.lat, checkpointNode.lng]} icon={glowingQuestionIcon} />
                )}
            </MapContainer>

            <img
                src={player?.car?.imageUrl}
                className="carSprite"
                style={{
                    transform: `translate(-50%, -50%) rotate(${carRotation}deg)`
                }}
            />

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
