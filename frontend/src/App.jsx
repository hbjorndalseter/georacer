import { MapContainer, TileLayer, Polygon } from 'react-leaflet';

export default function App() {

  const mapBounds = [[63.428, 10.390], [63.435, 10.400]]; // Juster etter område.

  return (
    <MapContainer center={[63.4305, 10.3951]} zoom={15} style={{ height: "100vh" }}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Polygon positions={mapBounds} color="blue" />
    </MapContainer>
  );
}

