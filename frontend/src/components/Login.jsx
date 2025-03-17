import React, { useEffect, useState } from "react";
import { usePlayer } from "../context/PlayerContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const { loginPlayer, player } = usePlayer();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginPlayer(username);
  };

  useEffect(() => {
    if (player) {
      navigate("/Play");
    }
  }, [player, navigate]);

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        placeholder="Brukernavn"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Logg inn</button>
    </form>
  );
};

export default Login;