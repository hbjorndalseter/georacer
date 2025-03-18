import { useState, useEffect } from "react";
import StartButton from "../components/StartButton"
import { useNavigate } from "react-router-dom";
import StartGame from "../components/StartGame";
export default function StartPage() {

    const [players, setPlayers] = useState([]);
    const [newPlayer, setNewPlayer] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:3000/api/players')
            .then(response => response.json())
            .then(data => setPlayers(data))
            .catch(error => console.error("Error:", error));
    }
    , []);

    return (
        <>
        <div className="w-screen h-screen bg-[#1b325e] justify-between items-center flex flex-col">
            <p className="text-white text-6xl font-bold mt-[2%]">
                VELKOMMEN TIL CITYHUNTER
            </p>
            <div>

            </div>
            <div className="flex flex-col items-center justify-baseline">
                <StartGame></StartGame>
            </div>
        </div>
        </>
    )
}