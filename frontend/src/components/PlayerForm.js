import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

function PlayerForm({ onPlayerAdded }) {
    const [playerName, setPlayerName] = useState('');
    const [playerAge, setPlayerAge] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPlayer = {
            name: playerName,
            age: playerAge,
        };

        try {
            const response = await axiosInstance.post('/Player', newPlayer);
            onPlayerAdded(response.data);
        } catch (error) {
            console.error('Error adding player:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Player Name"
                required
            />
            <input
                type="number"
                value={playerAge}
                onChange={(e) => setPlayerAge(e.target.value)}
                placeholder="Player Age"
                required
            />
            <button type="submit">Add Player</button>
        </form>
    );
}

export default PlayerForm;
