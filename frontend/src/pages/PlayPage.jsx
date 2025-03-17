import { useState, useEffect } from "react";
import GameMap from "../components/GameMap";
import { usePlayer } from "../context/PlayerContext";

const PlayPage = () => {
  const { player, updatePlayerScore } = usePlayer();
  const [score, setScore] = useState(player?.score || 0);

  useEffect(() => {
    if (player) {
      setScore(player.score);
    }
  }, [player]);

  const handleCorrectAnswer = async () => {
    const newScore = score + 1;
    setScore(newScore);
    await updatePlayerScore(newScore); // Oppdater backend
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