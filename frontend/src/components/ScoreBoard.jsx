import { useState, useEffect } from "react";
import "../styles/ScoreBoard.css"; 

const ScoreBoard = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/players/")
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
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