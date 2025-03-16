import { useState } from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";
import factIconURL from "../assets/compass2.png";

const factIcon = L.icon({
  iconUrl: factIconURL,
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

const factQuestionMarker = ({ coords, question, correctAnswer, onCorrectAnswer }) => {
  const [userAnswer, setUserAnswer] = useState("");

  const handleSubmit = () => {
    // Compare lowercase user answer to the correct answer
    if (userAnswer.trim().toLowerCase() === correctAnswer.toLowerCase()) {
      alert("Correct!");
      onCorrectAnswer();
    } else {
      alert("Sorry, that’s incorrect!");
    }
    // Clear the input or keep it—your choice
    setUserAnswer("");
  };

  return (
    <Marker position={coords} icon={factIcon}>
      <Popup>
        <div>
          <h3>{question}</h3>
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Type your answer"
            style={{ width: "100%", marginBottom: "5px" }}
          />
          <button onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export default factQuestionMarker;