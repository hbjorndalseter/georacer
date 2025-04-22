import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StartGame from "../components/StartGame";
import { Settings } from "lucide-react";

export default function StartPage() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/players`)
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="absolute top-12 right-6 z-15">
        <button
          onClick={() => navigate("/settings")}
          className="group p-2 rounded-full bg-white/10 hover:bg-white/20 transition"
          title="Innstillinger"
        >
          <Settings className="text-white w-6 h-6 transition-transform duration-200 group-hover:rotate-90" />
        </button>
      </div>
      <h1 className="text-white text-6xl font-bold mb-10">
        VELKOMMEN TIL GEORACER
      </h1>
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <StartGame />
        </div>
      </div>
    </div>
  );
}