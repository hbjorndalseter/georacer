import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import trondheimBildeURL from '../assets/nidarosdomen.png'
import osloBildeURL from '../assets/slottet.png'

// Hardcode your two city options:
const cityOptions = [
  {
    id: 1,
    name: "Trondheim",
    imageUrl: trondheimBildeURL, // Change to your actual path
  },
  {
    id: 2,
    name: "Oslo",
    imageUrl: osloBildeURL, // Change to your actual path
  },
];

const StartGame = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [username, setUsername] = useState("");
  const { loginPlayer } = usePlayer();

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleStartGame = () => {
    if (!username.trim() || !selectedCity) {
      toast.error("⚠️ Du må velge en by og skrive inn brukernavn!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }
    loginPlayer(username, selectedCity.id);
  };

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h2 className="text-3xl font-bold text-white mb-6">Velg en by</h2>

      <div className="flex flex-wrap gap-8 justify-center">
        {cityOptions.map((city) => (
          <button
          key={city.id}
          onClick={() => handleCitySelect(city)}
          className={`
            relative
            transition-transform
            duration-300
            hover:scale-105
        
            /* Keep a focus ring for accessibility */
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
        
            /* Show a blue border if selected, none if not */
            ${selectedCity?.id === city.id ? "border-2 border-blue-500" : ""}
          `}
        >
          <img
            src={city.imageUrl}
            alt={city.name}
            className="w-64 h-64 object-cover"
          />
        </button>
        ))}
      </div>

      {selectedCity && (
        <div className="mt-8 flex flex-col items-center">
          <h3 className="text-2xl font-semibold text-white mb-4">
            Du har valgt:{" "}
            <span className="text-blue-300">{selectedCity.name}</span>
          </h3>
          <input
            type="text"
            value={username}
            placeholder="Skriv inn brukernavn"
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 text-white text-lg rounded-lg border border-gray-400 
                       focus:outline-none focus:ring-2 focus:ring-gray-300 mb-4 w-72 text-center"
          />
          <button
            onClick={handleStartGame}
            className="px-6 py-3 text-lg rounded-xl font-semibold bg-white text-black 
                       hover:bg-gray-200 transition duration-300 shadow-md hover:scale-105"
          >
            Start spillet
          </button>
        </div>
      )}
    </div>
  );
};

export default StartGame;