import { useState, useEffect } from "react";
import ScoreBoard from "../components/ScoreBoard.jsx";
import LoadingOverlay from "../components/LoadingScreen.jsx";
import NavigateHome from "../components/NavigateHomeButton.jsx";

const ResultPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const [cityMaps, setCityMaps] = useState([]);
  const [selectedMapId, setSelectedMapId] = useState(null);

  const handleScoreBoardLoaded = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        setShowOverlay(false);
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  // Hent alle kart
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/city-maps`)
      .then((res) => res.json())
      .then((data) => {
        setCityMaps(data);
        if (data.length > 0 && !selectedMapId) {
          setSelectedMapId(data[0].id); // velg første som fallback
        }
      })
      .catch((error) => console.error("Feil ved henting av kart:", error));
  }, []);

  return (
    <div className="relative w-screen h-screen flex flex-col items-center pt-10">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text 
        bg-gradient-to-r from-sky-400 via-blue-500 to-red-600 
        drop-shadow-md animate-fade-in mt-2 mb-2 tracking-wide">
        RESULTATSLISTE
      </h1>

      {/* 🔽 Dropdown-menyen plassert her */}
      <div className="mb-6 text-center">
        <div className="text-white text-sm mb-2">Velg by for å se highscore:</div>
        <select
          className="bg-white/20 text-white px-4 py-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={selectedMapId || ""}
          onChange={(e) => {
            setIsLoading(true); // Vis loading spinner direkte
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
        <ScoreBoard
          onLoaded={handleScoreBoardLoaded}
          overrideMapId={selectedMapId}
        />
      </div>

      {showOverlay && <LoadingOverlay loadingText="Henter resultater..." />}
      <NavigateHome />
    </div>
  );
};

export default ResultPage;