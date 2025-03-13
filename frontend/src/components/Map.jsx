import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';

export default function Map({ mapId = 1 }) {
    const [nodes, setNodes] = useState([]);
    const startNodeId = 1;
    const [position, setPosition] = useState([63.4305, 10.3951]);

    useEffect(() => {
        const fetchNodes = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/nodes/${mapId}`);
                const data = await response.json();
                setNodes(data);
            } catch (error) {
                console.error("Error fetching nodes:", error);
            }
        };
        fetchNodes();

    }, []);

    return (
        <MapContainer center={position} zoom={15} style={{ height: "80vh", width: "50%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            {nodes.map(node => (
                <CircleMarker
                    key={node.id}
                    center={[node.lat, node.lng]}
                    radius={5} // Size of the circle
                    fillColor={node.id === startNodeId ? "red" : "blue"} // Highlight start node
                    color="black"
                    weight={1}
                    fillOpacity={0.8}
                >
                    <Popup>
                        <b>Node ID:</b> {node.id}
                    </Popup>
                </CircleMarker>
            ))}
        </MapContainer>
    );
}

