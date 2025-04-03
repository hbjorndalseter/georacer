import { useState, useEffect } from "react";
import ScoreBoard from "../components/ScoreBoard.jsx";

const ResultPage = () => {
  // isLoading controls the overlay opacity.
  const [isLoading, setIsLoading] = useState(true);
  // showOverlay controls whether the overlay is rendered at all.
  const [showOverlay, setShowOverlay] = useState(true);

  const handleScoreBoardLoaded = () => {
    setIsLoading(false);
  };

  // When isLoading becomes false, wait for the fade transition to finish, then remove the overlay.
  useEffect(() => {
    if (!isLoading) {
      const timeoutId = setTimeout(() => {
        setShowOverlay(false);
      }, 500); // Match this delay to your CSS transition duration.
      return () => clearTimeout(timeoutId);
    }
  }, [isLoading]);

  return (
    <div className="relative w-screen h-screen bg-gradient-to-br from-[#1b325e] via-[#3a538c] to-[#1b325e] flex flex-col items-center pt-10">
      <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-lime-400 to-green-500 drop-shadow-md animate-fade-in mt-2 mb-4 tracking-wide">
        RESULTATSLISTE
      </h1>
      <div className="w-96 h-1 bg-gradient-to-r from-emerald-400 via-lime-400 to-green-500 rounded-full shadow-lg mb-4"></div>
      <ScoreBoard onLoaded={handleScoreBoardLoaded} />
      
      {showOverlay && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-[#1b325e] bg-opacity-60 backdrop-blur-sm transition-opacity duration-500"
          style={{
            zIndex: 9999,
            opacity: isLoading ? 1 : 0,
            pointerEvents: isLoading ? "auto" : "none",
          }}
        >
          <div className="loader text-white text-xl animate-pulse">Henter resultatslisten...</div>
        </div>
      )}
    </div>
  );
};

export default ResultPage;