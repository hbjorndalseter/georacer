import { useState, useEffect } from "react";
  
  const ScoreBoard = ({ onLoaded, mapId }) => {
  const [players, setPlayers] = useState([]);
  const [mapName, setMapName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!mapId) return;

    setIsLoading(true);

    fetch(`${import.meta.env.VITE_API_URL}/players/top-players-by-map/${mapId}`)
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

    fetch(`${import.meta.env.VITE_API_URL}/city-maps/${mapId}`)
      .then((res) => res.json())
      .then((name) => setMapName(name))
      .catch((error) => console.error("Feil ved henting av kartnavn:", error));
  }, [mapId]);

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