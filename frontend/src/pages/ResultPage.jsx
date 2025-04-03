import { useState, useEffect } from "react";
import ScoreBoard from "../components/ScoreBoard.jsx";
import LoadingOverlay from "../components/LoadingScreen.jsx";

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
      <div className="w-full flex justify-center">
        <ScoreBoard onLoaded={handleScoreBoardLoaded} />
      </div>
      
      {showOverlay && <LoadingOverlay loadingText="Henter resultater..."/>}
    </div>
  );
};

export default ResultPage;