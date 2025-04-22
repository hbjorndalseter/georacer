import { useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { toast } from "react-toastify";
import ChooseCarModal from "./ChooseCarModal";

import trondheimBildeURL from "../assets/nidarosdomen.png";
import osloBildeURL from "../assets/slottet.png";

const cityOptions = [
  { id: 1, name: "Trondheim", imageUrl: trondheimBildeURL },
  { id: 2, name: "Oslo", imageUrl: osloBildeURL },
  // Legg til flere byer her...
];

const StartGame = () => {
  const [selectedCity, setSelectedCity] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [username, setUsername] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { loginPlayer } = usePlayer();

  const handleStartGame = () => {
    if (!username.trim() || !selectedCity || !selectedCar) {
      toast.error("⚠️ Du må velge en by, bil og skrive inn brukernavn!", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
      return;
    }
    loginPlayer(username, selectedCity.id, selectedCar);  
  };

  return (
    <div className="flex flex-col items-center w-full px-6 mt-10">
      <h2 className="text-xl font-semibold text-white mb-4">Velg en by</h2>

      {/* Byer i grid */}
      <div className="flex justify-center gap-6 mb-6">
  {cityOptions.map((city) => (
    <div
      key={city.id}
      className="flex flex-col items-center cursor-pointer"
      onClick={() => setSelectedCity(city)}
    >
      <div
        className={`w-36 h-36 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
          selectedCity?.id === city.id
            ? "border-blue-500 scale-105"
            : "border-transparent"
        }`}
      >
        <img
          src={city.imageUrl}
          alt={city.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="text-white mt-2 text-center">{city.name}</div>
    </div>
  ))}
</div>

      {/* Velg bil knapp */}
      <button
          onClick={() => setShowModal(true)}
          className="mb-6 px-6 py-2 bg-white text-black rounded-md font-medium hover:bg-gray-200 transition"
        >
          {selectedCar ? selectedCar.name : "Velg bil"}
        </button>

      {/* Brukernavn + start */}
      <div className="flex flex-col items-center w-72">
        <input
          type="text"
          placeholder="Skriv inn brukernavn"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="px-4 py-2 text-white text-lg rounded-lg border border-gray-400 mb-4 w-full text-center bg-transparent focus:outline-none focus:ring-2 focus:ring-gray-300"
        />
        <button
          onClick={handleStartGame}
          disabled={!username.trim() || !selectedCity || !selectedCar}
          className={`w-full py-3 text-lg rounded-xl font-semibold shadow-md transition duration-300 ${
            !username.trim() || !selectedCity || !selectedCar
              ? "bg-gray-400 text-gray-800 cursor-not-allowed"
              : "bg-white text-black hover:bg-gray-200 hover:scale-105"
          }`}
        >
          Start spillet
        </button>
      </div>
      

      {showModal && (
        <ChooseCarModal
          selectedCar={selectedCar}
          setSelectedCar={setSelectedCar}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default StartGame;