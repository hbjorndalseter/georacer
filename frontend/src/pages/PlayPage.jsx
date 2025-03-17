import { useState } from "react";
import GameMap from "../components/GameMap";

const PlayPage = () => {
  const [score, setScore] = useState(0);

  const handleCorrectAnswer = () => {
    setScore((prevScore) => prevScore + 1);
  };

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Score-display */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          zIndex: 9999,
          backgroundColor: "gray",
          padding: "5px 10px",
          borderRadius: "4px",
        }}
      >
        Score: {score}
      </div>

      <GameMap handleCorrectAnswer={handleCorrectAnswer} />
    </div>
  );
};

export default PlayPage;