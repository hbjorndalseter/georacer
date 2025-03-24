import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import trondheimBildeURL from "../assets/nidarosdomen.png";
import osloBildeURL from "../assets/slottet.png";

const cityOptions = [
  {
    id: 1,
    name: "Trondheim",
    imageUrl: trondheimBildeURL,
  },
  {
    id: 2,
    name: "Oslo",
    imageUrl: osloBildeURL,
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

  const isDisabled = !username.trim() || !selectedCity;

  return (
    <div className="flex flex-col items-center w-full mt-10">
      <h2 className="text-3xl font-bold text-white mb-6">Velg en by</h2>

      {/* City Selection */}
      <div className="flex flex-wrap gap-8 justify-center">
        {cityOptions.map((city) => (
          <div key={city.id} className="flex flex-col items-center">
            <button
              onClick={() => handleCitySelect(city)}
              // Only add a permanent ring if the city is selected
              className={`
                w-64 h-64
                rounded-lg
                overflow-hidden
                transition-transform
                duration-300
                hover:scale-105
                focus:outline-none
                ${
                  selectedCity?.id === city.id
                    ? "ring-4 ring-blue-500" // persistent ring
                    : "" // no ring if not selected
                }
              `}
            >
              <img
                src={city.imageUrl}
                alt={city.name}
                className="w-full h-full object-cover"
              />
            </button>
            {/* City name below the image */}
            <span className="text-white mt-2">{city.name}</span>
          </div>
        ))}
      </div>

      {/* Username + Start Button */}
      <div className="mt-8 flex flex-col items-center">
        <input
          type="text"
          value={username}
          placeholder="Skriv inn brukernavn"
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 text-white text-lg rounded-lg 
                     border border-gray-400 
                     mb-4 w-72 text-center
                     focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button
          onClick={handleStartGame}
          disabled={isDisabled}
          className={`
            px-6 py-3 text-lg rounded-xl font-semibold shadow-md 
            transition duration-300
            ${
              isDisabled
                ? "bg-gray-400 text-gray-800 cursor-not-allowed"
                : "bg-white text-black hover:bg-gray-200 hover:scale-105"
            }
          `}
        >
          Start spillet
        </button>
      </div>
    </div>
  );
};

export default StartGame;