import { useEffect, useState } from 'react';
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


import car1 from "../assets/RedCar.png";
import car2 from "../assets/police.png";
import car3 from "../assets/lightning.png";
import car4 from "../assets/f1.png";
import car5 from "../assets/taxi.png";
import car6 from "../assets/volvo.png";

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
        fetch(`http://localhost:3000/api/roadnet/${mapId}/startnode`)
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
        fetch(`http://localhost:3000/api/roadnet/${mapId}/${currentNode}/neighbours`)
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

    // Handle arrow click to move to the neighbour node using built-in animation
    function handleArrowClick(neighbour, rot_angle) {
        setArrowsVisible(false);

        setCarRotation(rot_angle + 90);

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
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    attribution="&copy; OpenStreetMap & CartoDB"
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
