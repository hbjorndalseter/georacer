import React, { useState } from 'react';
import { usePlayer } from '../context/PlayerContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const { loginPlayer, player } = usePlayer();

    const handleLogin = async (e) => {
        e.preventDefault();
        await loginPlayer(username);
    };

    if(player) {
        return (
            <div>
                <h1>Du er logget inn som {player.name}</h1>
            </div>
        );
    }

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