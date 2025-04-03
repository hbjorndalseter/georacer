import { useState, useEffect } from "react";
import "../styles/ScoreBoard.css"; 
import { usePlayer } from "../context/PlayerContext";

const ScoreBoard = ({ onLoaded }) => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { player } = usePlayer();
  const [mapName, setMapName] = useState("");

  useEffect(() => {
    if (!player?.cityMapId) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/players/top-players-by-map/${player.cityMapId}`)
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

  useEffect(() =>  {
    if (!player.cityMapId) return;

    fetch(`${import.meta.env.VITE_API_URL}/api/city-maps/${player.cityMapId}`)
    .then((res) => res.json())
    .then((data) => {
      setMapName(data)
    })
    .catch((error) => {
      console.error("Error fetching map name:", error)
    })
  }, [!isLoading])

  const sortedPlayers = [...players];
  //const topPlayers = sortedPlayers.slice(0, 10);

  return (
    <div className="scoreboard-container">
      <p className="text-white text-5xl font-bold mt-[2%] justify-center items-center flex "> 
        {mapName}
      </p>
      <div className="scoreboard">
        {sortedPlayers.map((player) => (
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