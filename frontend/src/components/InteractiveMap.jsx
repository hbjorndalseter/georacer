import { useEffect, useState } from "react";
import { MapContainer, TileLayer, useMap, Marker } from "react-leaflet";
import { calculatePositionOfArrow, calculateDistance } from "../utils/algorithms.js";
import Arrow from "./Arrow.jsx";
import carURL from "../assets/redCar.png";
import "leaflet/dist/leaflet.css";
import "../styles/Map.css";

export default function InteractiveMap({
  mapId,
  checkpointNode,
  onCheckpointReached,
}) {
  const [position, setPosition] = useState([63.4305, 10.3951]);
  const [currentNode, setCurrentNode] = useState(1);
  const [neighbours, setNeighbours] = useState([]);
  const [arrowsVisible, setArrowsVisible] = useState(true);
  const [carRotation, setCarRotation] = useState(0);
  const [distance, setDistance] = useState(0);

  // Fetch the starting position.
  useEffect(() => {
    fetch(`http://localhost:3000/api/roadnet/${mapId}/startnode`)
      .then((response) => response.json())
      .then((data) => setPosition([data.lat, data.lng]))
      .catch((error) => console.error("Error fetching start node:", error));
  }, [mapId]);

  // Component that handles animated panning without any extra delay.
  function CenterMap({ position, distance }) {
    const map = useMap();
    useEffect(() => {
      const duration = distance ? distance / 250 : 0.5;
      map.panTo(position, { animate: true, duration });
    }, [position, distance, map]);
    return null;
  }

  // Fetch neighbours for the current node.
  useEffect(() => {
    fetch(`http://localhost:3000/api/roadnet/${mapId}/${currentNode}/neighbours`)
      .then((response) => response.json())
      .then((data) => {
        setNeighbours(data);
        setArrowsVisible(true);
      })
      .catch((error) => console.error("Error fetching neighbours:", error));

    if (checkpointNode && currentNode === checkpointNode.id) {
      onCheckpointReached();
    }
  }, [currentNode, mapId, checkpointNode, onCheckpointReached]);

  // Handle arrow clicks (immediately update the current node).
  function handleArrowClick(neighbour, rot_angle) {
    setArrowsVisible(false);
    const dist = calculateDistance(
      neighbour.lat,
      neighbour.lng,
      position[0],
      position[1]
    );
    setCarRotation(rot_angle + 90);
    setDistance(dist);
    setPosition([neighbour.lat, neighbour.lng]);
    // Immediately update current node (removing any delay).
    setCurrentNode(neighbour.id);
  }

  return (
    <div id="container" style={{ position: "relative", height: "80vh", width: "50%" }}>
      <MapContainer
        center={position}
        zoom={18}
        minZoom={18}
        style={{ height: "100%", width: "100%" }}
        dragging={false}
        zoomControl={false}
        doubleClickZoom={false}
      >
        <TileLayer
          url="https://tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey=6e87f65590d044e99e27369fd99280da"
          attribution='Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>,
                       Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <CenterMap position={position} distance={distance} />
        {checkpointNode && (
          <Marker position={[checkpointNode.lat, checkpointNode.lng]} />
        )}
      </MapContainer>
      <img
        src={carURL}
        className="carSprite"
        style={{ transform: `translate(-50%, -50%) rotate(${carRotation}deg)` }}
        alt="Car"
      />
      {arrowsVisible &&
        neighbours.map((neighbour) => {
          const { rot_angle, x_p, y_p } = calculatePositionOfArrow(
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