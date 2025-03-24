import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const PlayerContext = createContext(null);

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);
  const navigate = useNavigate();

  // Henter ut eller oppretter spilleren i databasen
  const loginPlayer = async (username, cityMapId) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/players/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username, cityMapId }),
      });
  
      if (!res.ok) {
        throw new Error("Feil ved innlogging eller opprettelse av spiller.");
      }
  
      const data = await res.json();
      setPlayer(data.player); // Lagre spilleren i context
      navigate("/Game");
    } catch (error) {
      console.error("Feil ved login:", error);
    }
  };

  const updatePlayerScore = (newScore) => {
    setPlayer((prev) => ({ ...prev, score: newScore }));
  };

  return (
    <PlayerContext.Provider value={{ player, loginPlayer, updatePlayerScore }}>
      {children}
    </PlayerContext.Provider>
  );
};