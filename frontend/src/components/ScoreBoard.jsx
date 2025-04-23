import { useState, useEffect } from "react";
import "../styles/ScoreBoard.css";
import { usePlayer } from "../context/PlayerContext";

const ScoreBoard = ({ onLoaded, overrideMapId }) => {
  const { player } = usePlayer();

  const [players, setPlayers] = useState([]);
  const [cityMaps, setCityMaps] = useState([]);
  const [selectedMapId, setSelectedMapId] = useState(null);
  const [mapName, setMapName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Sett default map ved første render
  useEffect(() => {
    if (overrideMapId) {
      setSelectedMapId(overrideMapId);
    } else if (player?.cityMapId) {
      setSelectedMapId(player.cityMapId);
    }
  }, [overrideMapId, player]);

  // Hent alle city maps for dropdown
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/city-maps`)
      .then((res) => res.json())
      .then((data) => setCityMaps(data))
      .catch((error) => console.error("Feil ved henting av kart:", error));
  }, []);

  // Hent spillere basert på valgt kart
  useEffect(() => {
    if (!selectedMapId) return;

    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/api/players/top-players-by-map/${selectedMapId}`)
      .then((res) => res.json())
      .then((data) => {
        setPlayers(data);
        setIsLoading(false);
        if (onLoaded) onLoaded();
      })
      .catch((error) => {
        console.error("Feil ved henting av spillere:", error);
        setIsLoading(false);
        if (onLoaded) onLoaded();
      });

    fetch(`${import.meta.env.VITE_API_URL}/api/city-maps/${selectedMapId}`)
      .then((res) => res.json())
      .then((name) => setMapName(name))
      .catch((error) => console.error("Feil ved henting av kartnavn:", error));
  }, [selectedMapId]);

  return (
    <div className="w-full max-w-2xl px-6 py-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-xl mt-4">
      <h2 className="text-white text-4xl font-bold mb-6 text-center">{mapName}</h2>
  
      <div className="space-y-4 mb-6">
      {players.length > 0 ? (
        players.map((player, index) => {
          const medal = index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : null;

          return (
            <div
              key={player.id}
              className="flex justify-between items-center px-4 py-2 bg-white/20 rounded-xl text-white font-medium hover:bg-white/30 transition"
            >
              <span className="capitalize">
                {medal ? (
                  <span className="mr-2 text-xl">{medal}</span>
                ) : (
                  <span className="mr-2">{index + 1}.</span>
                )}
                {player.name}
              </span>
              <span className="font-semibold">{player.score}</span>
            </div>
          );
        })
      ) : (
        <div className="text-white text-center italic">Ingen spiller har fullført dette kartet.</div>
      )}
    </div>
    </div>
  );
};

export default ScoreBoard;