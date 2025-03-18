import { useState, useEffect } from "react";
import { usePlayer } from "../context/PlayerContext";

const { VITE_API_URL } = import.meta.env;

const ChooseCity = () => {
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
    <div style={styles.container}>
      <h1 style={styles.title}>Velg en by</h1>

      {loading && <p style={styles.loading}>Laster inn bykart...</p>}
      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.cityList}>
        {cities.map((city) => (
          <button
            key={city.id}
            style={{
              ...styles.cityButton,
              backgroundColor: selectedCity?.id === city.id ? "#4CAF50" : "#f0f0f0",
              color: selectedCity?.id === city.id ? "white" : "black",
            }}
            onClick={() => handleCitySelect(city)}
          >
            {city.name}
          </button>
        ))}
      </div>

      {selectedCity && (
        <div style={styles.inputContainer}>
          <h2 style={styles.selectedCity}>Du har valgt: {selectedCity.name}</h2>
          <input
            type="text"
            value={username}
            placeholder="Skriv inn brukernavn"
            onChange={(e) => setUsername(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleStartGame} style={styles.startButton}>
            Start spillet
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    backgroundColor: "#1E3A5F",
    color: "white",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  title: {
    fontSize: "2.5rem",
    marginBottom: "20px",
  },
  loading: {
    fontSize: "1.2rem",
    color: "#FFD700",
  },
  error: {
    color: "red",
    fontSize: "1.2rem",
  },
  cityList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "15px",
    justifyContent: "center",
    maxWidth: "600px",
  },
  cityButton: {
    padding: "10px 20px",
    fontSize: "1.2rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    transition: "background-color 0.3s, transform 0.2s",
  },
  selectedCity: {
    fontSize: "1.5rem",
    marginTop: "20px",
  },
  inputContainer: {
    marginTop: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "10px",
    textAlign: "center",
  },
  startButton: {
    padding: "10px 20px",
    fontSize: "1.2rem",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    backgroundColor: "#FF8C00",
    color: "white",
    transition: "background-color 0.3s, transform 0.2s",
  },
};

export default ChooseCity;