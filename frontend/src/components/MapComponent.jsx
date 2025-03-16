import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapComponent = () => {
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
        </MapContainer>
    );
};

export default MapComponent;