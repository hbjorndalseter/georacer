import { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";

const { VITE_API_URL } = import.meta.env;

const StartGame = () => {
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { loginPlayer } = usePlayer();

  useEffect(() => {
    const fetchCities = async () => {
      if (!VITE_API_URL) {
        console.error("VITE_API_URL er ikke definert!");
        setError("Kan ikke hente bykart – server-URL mangler.");
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`${VITE_API_URL}/api/city-maps`);
        if (!res.ok) {
          throw new Error(`Feil ved henting av bykart. HTTP-status: ${res.status}`);
        }
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.error("Feil ved henting av bykart:", error);
        setError("Kunne ikke hente bykart. Prøv igjen senere.");
      } finally {
        setLoading(false);
      }
    };

    fetchCities();
  }, []);

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleStartGame = () => {
    if (!username.trim() || !selectedCity) {
      alert("Du må velge en by og skrive inn brukernavn!");
      return;
    }
    loginPlayer(username, selectedCity.id);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-6">Velg en by</h1>

      {loading && <p className="text-lg text-yellow-400">Laster inn bykart...</p>}
      {error && <p className="text-lg text-red-500">{error}</p>}

      <div className="flex flex-wrap gap-4 justify-center max-w-xl">
        {cities.map((city) => (
          <button
            key={city.id}
            className={`px-6 py-3 text-lg rounded-lg font-semibold transition duration-200 
              ${
                selectedCity?.id === city.id
                  ? "bg-green-500 text-white shadow-lg"
                  : "bg-gray-300 text-black hover:bg-gray-400"
              }`}
            onClick={() => handleCitySelect(city)}
          >
            {city.name}
          </button>
        ))}
      </div>

      {selectedCity && (
        <div className="mt-6 flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-3">Du har valgt: {selectedCity.name}</h2>
          <input
            type="text"
            value={username}
            placeholder="Skriv inn brukernavn"
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 text-black text-lg rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
          />
          <button
            onClick={handleStartGame}
            className="px-6 py-3 text-lg rounded-lg font-semibold bg-orange-500 hover:bg-orange-600 transition duration-200"
          >
            Start spillet
          </button>
        </div>
      )}
    </div>
  );
};

export default StartGame;