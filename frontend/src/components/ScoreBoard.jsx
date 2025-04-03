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
    <div className="w-full max-w-2xl px-6 py-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl mt-4">
      <p className="text-white text-4xl font-bold text-center mb-6">
        {mapName}
      </p>
  
      <div className="space-y-4">
        {sortedPlayers.map((player, index) => {
          const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : null;
  
          return (
            <div
              key={player.id}
              className="flex justify-between items-center px-4 py-2 bg-white/20 rounded-xl text-white font-medium hover:bg-white/30 transition"
            >
              <span className="capitalize">
                {medal && <span className="mr-2">{medal}</span>}
                {index + 1}. {player.name}
              </span>
              <span className="font-semibold">{player.score}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ScoreBoard;