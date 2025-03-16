import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import FactQuestion from "../components/FactQuestion";

const MapComponent = ({ handleCorrectAnswer }) => {
  return (
    <MapContainer 
      center={[63.4305, 10.3951]} 
      zoom={20} 
      style={{ height: "100vh", width: "100vw" }} // Full screen
      zoomControl={false}
    >
      <TileLayer
        url="https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=6e87f65590d044e99e27369fd99280da"
        attribution='Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, 
                     Data &copy; <a href="http://www.openstreetmap.org/copyright">
                     OpenStreetMap</a>'
      />
      
      <FactQuestion
        coords={[63.429, 10.393]} // Coordinates for the sculpture
        question="Who created this sculpture?"
        correctAnswer="Gustav Vigeland" // Expected answer (case-insensitive)
        onCorrectAnswer={handleCorrectAnswer}
      />
    </MapContainer>
  );
};

export default MapComponent;