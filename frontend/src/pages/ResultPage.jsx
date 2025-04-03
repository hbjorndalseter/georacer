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
    <div className="relative w-screen h-screen bg-[#1b325e] flex flex-col justify-between items-center">
      <p className="text-white text-6xl font-bold mt-[2%]">
        RESULTATSLISTE
      </p>
      <div className="flex flex-col items-center justify-baseline">
        <ScoreBoard onLoaded={handleScoreBoardLoaded} />
      </div>
      
      {showOverlay && <LoadingOverlay loadingText="Henter resultater..."/>}
    </div>
  );
};

export default ResultPage;