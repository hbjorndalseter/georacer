import { useState, useEffect } from "react";
import StartButton from "../components/StartButton"
import { useNavigate } from "react-router-dom";

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

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(!newPlayer.trim()) {
            alert("Navn må oppgis før du kan starte spillet.");
            return;
        }

        // Sjekk om navnet allerede finnes
        if (players.some(player => player.name === newPlayer)) {
            alert("Dette navnet er allerede tatt. Vennligst velg et annet navn.");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/players', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name: newPlayer })
            });
    
            if (!response.ok) throw new Error("Feil ved lagring");
    
            setNewPlayer(""); // Tøm inputfeltet
            navigate('/Play'); // Naviger til spillet
    
            // 🔄 Hent listen på nytt fra backend!
            const updatedPlayers = await fetch('http://localhost:3000/api/players').then(res => res.json());
            setPlayers(updatedPlayers);
    
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <>
        <div className="w-screen h-screen bg-[#1b325e] justify-between items-center flex flex-col">
            <p className="text-white text-6xl font-bold mt-[2%]">
                VELKOMMEN TIL GEORACER
            </p>
            <div className="flex flex-col items-center justify-baseline">
                <form className="flex flex-col items-center mb-[0%]">
                    <input className="mb-[10%] text-2xl"
                        type="text"
                        value={newPlayer}
                        onChange={(e) => setNewPlayer(e.target.value)}
                        placeholder="Skriv inn brukernavn"
                        required
                    />
                    <StartButton onClick={handleSubmit} className="mb-[5%]" title="START SPILLET"></StartButton>
                </form>
            </div>
        </div>
        </>
    )
}