import { createContext, useContext, useState } from "react";

const PlayerContext = createContext(null);

export const usePlayer = () => useContext(PlayerContext);

const API_URL = import.meta.env.VITE_API_URL;
if (!API_URL) {
  console.error("🚨 Feil: VITE_API_URL er ikke definert! Sjekk .env-filen din.");
}

export const PlayerProvider = ({ children }) => {
  const [player, setPlayer] = useState(null);

  const loginPlayer = async (username) => {
    try {
      const res = await fetch(`${API_URL}/api/players/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: username }),
      });

      if (!res.ok) {
        throw new Error("Feil ved login");
      }

      const data = await res.json();
      setPlayer(data.player);
    } catch (error) {
      console.error("Feil ved login:", error);
    }
  };

  return (
    <PlayerContext.Provider value={{ player, loginPlayer }}>
      {children}
    </PlayerContext.Provider>
  );
};