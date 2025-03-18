import React, { useState } from "react";
import { usePlayer } from "../context/PlayerContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const { loginPlayer } = usePlayer();

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginPlayer(username);
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="text"
        value={username}
        placeholder="Brukernavn"
        onChange={(e) => setUsername(e.target.value)}
      />
      <button type="submit">Start spillet</button>
    </form>
  );
};

export default Login;