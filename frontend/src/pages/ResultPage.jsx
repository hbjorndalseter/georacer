import { useState, useEffect } from "react";
import ScoreBoard from "../components/ScoreBoard.jsx";
import LoadingOverlay from "../components/LoadingScreen.jsx";
import NavigateHome from "../components/NavigateHomeButton.jsx";
import { usePlayer } from "../context/PlayerContext.jsx";

const ResultPage = () => {
  const { player } = usePlayer();
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [cityMaps, setCityMaps] = useState([]);
  const [selectedMapId, setSelectedMapId] = useState(null);

  const handleScoreBoardLoaded = () => {
    setIsLoading(false);
  };

  // Sett valgt by fra spiller
  useEffect(() => {
    if (player?.cityMapId) {
      setSelectedMapId(player.cityMapId);
    }
  }, [player]);

  // Hent alle tilgjengelige kart
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/city-maps`)
      .then((res) => res.json())
      .then((data) => setCityMaps(data))
      .catch((error) => console.error("Feil ved henting av kart:", error));
  }, []);

  // Skjul overlay etter innlasting
  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        setShowOverlay(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center pt-10">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-r from-sky-400 via-blue-500 to-red-600 
        drop-shadow-md animate-fade-in mt-2 mb-2 tracking-wide">
        RESULTATSLISTE
      </h1>

      {/* Dropdown */}
      <div className="mb-6 text-center">
        <div className="text-white text-sm mb-2">Velg by for å se highscore:</div>
        <select
          className="bg-white/20 text-white px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={selectedMapId || ""}
          onChange={(e) => {
            setIsLoading(true);
            setSelectedMapId(Number(e.target.value));
          }}
        >
          {cityMaps.map((map) => (
            <option key={map.id} value={map.id}>
              {map.name}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full flex justify-center">
        {selectedMapId && (
          <ScoreBoard
            onLoaded={handleScoreBoardLoaded}
            mapId={selectedMapId}
          />
        )}
      </div>

      {showOverlay && <LoadingOverlay loadingText="Henter resultater..." />}
      <NavigateHome />
    </div>
  );
};

export default ResultPage;