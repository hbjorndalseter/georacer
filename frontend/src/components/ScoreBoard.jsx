import { useState, useEffect } from "react";
import "../styles/ScoreBoard.css"; 

const ScoreBoard = ({ onLoaded }) => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3000/api/players/")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        setIsLoading(false);
        if (onLoaded) onLoaded();
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
        setIsLoading(false);
        if (onLoaded) onLoaded();
      });
  }, []);

  const sortedPlayers = [...players].sort((a, b) => b.score - a.score);
  const topPlayers = sortedPlayers.slice(0, 10);

  return (
    <div className="scoreboard-container">
      <div className="scoreboard">
        {topPlayers.map((player) => (
          <div className="scoreboard-row" key={player.id}>
            <div className="scoreboard-player">{player.name}</div>
            <div className="scoreboard-score">{player.score}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreBoard;