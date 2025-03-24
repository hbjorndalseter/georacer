import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import StartGame from "../components/StartGame";

export default function StartPage() {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/api/players")
      .then((response) => response.json())
      .then((data) => setPlayers(data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="w-screen h-screen bg-[#1b325e] flex flex-col items-center justify-center">
      <h1 className="text-white text-6xl font-bold mb-10">
        VELKOMMEN TIL CITYHUNTER
      </h1>
      
      {/* 
        The StartGame component is wrapped in a container for layout.
        You can style it as you wish. 
      */}
      <div className="w-full flex justify-center">
        <div className="max-w-4xl w-full flex flex-col items-center">
          <StartGame />
        </div>
      </div>
    </div>
  );
}