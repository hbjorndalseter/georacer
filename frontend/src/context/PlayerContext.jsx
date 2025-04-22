import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UsernameConflictModal from "../components/UsernameConflictModal.jsx";

const PlayerContext = createContext(null);

// Can access gamepage straight away
const defaultPlayer = {
  name: "DevPlayer",
  cityMapId: 1,
  car: { imageUrl: "src/assets/redCar.png" },
  score: 0
};

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(defaultPlayer);
  const [pendingPlayer, setPendingPlayer] = useState(null);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const navigate = useNavigate();

  const loginPlayer = async (username, cityMapId, car) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/players/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, cityMapId }),
      });
  
      if (!res.ok) throw new Error("Feil ved login");
  
      const data = await res.json();
  
      console.log("Login response:", data);
  
      if (data.alreadyExists) {
        console.log("Brukernavn finnes allerede – viser modal");
        setPendingPlayer(data.player);
        setPendingPlayer({ ...data.player, car });
        setShowConflictModal(true);
        return;
      }
  
      console.log("Ny spiller, går videre til spillet");
      setPlayer(data.player);
      setPlayer({ ...data.player, car });
      navigate("/Game");
    } catch (error) {
      console.error("Feil ved login:", error);
    }
  };

  const updatePlayerScore = (newScore) => {
    setPlayer((prev) => ({ ...prev, score: newScore }));
  };

  const handleProceed = () => {
    setPlayer({ ...pendingPlayer, car: pendingPlayer.car });
    setPendingPlayer(null);
    setShowConflictModal(false);
    navigate("/Game");
  };

  const handleCancel = () => {
    setPendingPlayer(null);
    setShowConflictModal(false);
  };

  return (
    <PlayerContext.Provider value={{ player, loginPlayer, updatePlayerScore }}>
      {children}
      {showConflictModal && (
        <UsernameConflictModal
          username={pendingPlayer?.name}
          onProceed={handleProceed}
          onCancel={handleCancel}
        />
      )}
    </PlayerContext.Provider>
  );
};