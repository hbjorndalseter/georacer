import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import FactQuestion from "./FactQuestion";

const MapComponent = ({ handleCorrectAnswer, factQuestions }) => {
  return (
    <MapContainer
      center={[63.4305, 10.3951]}
      zoom={15}
      style={{ height: "100vh", width: "100vw" }}
      zoomControl={false}
    >
      <TileLayer
        url="https://tile.thunderforest.com/pioneer/{z}/{x}/{y}.png?apikey=6e87f65590d044e99e27369fd99280da"
        attribution='Maps &copy; <a href="https://www.thunderforest.com/">Thunderforest</a>, 
                     Data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {factQuestions.map((q) => (
        <FactQuestion
          key={q.id}
          coords={[q.lat, q.lng]}
          question={q.question}
          correctAnswer={q.correctAnswer}
          onCorrectAnswer={handleCorrectAnswer}
        />
      ))}
    </MapContainer>
  );
};

export default MapComponent;