import React, { useState, useEffect } from 'react';
import { FiCheck, FiX } from 'react-icons/fi';
import axiosInstance from '../axiosInstance';

function PlayerForm({ onPlayerSaved, existingPlayer = null }) {
    const [player, setPlayer] = useState({
        playerName: '',
        age: '',
        email: '',
        level: '',
    });

    useEffect(() => {
        if (existingPlayer) setPlayer(existingPlayer);
    }, [existingPlayer]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPlayer({ ...player, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (existingPlayer) {
                // Update player
                await axiosInstance.put(`/Player/${existingPlayer.playerId}`, player);
            } else {
                // Create new player
                await axiosInstance.post('/Player', player);
            }
            onPlayerSaved();
        } catch (error) {
            console.error('Error saving player:', error);
        }
    };

    return (
        <form className="player-form" onSubmit={handleSubmit}>
            <input
                type="text"
                name="playerName"
                value={player.playerName}
                onChange={handleChange}
                placeholder="Player Name"
                required
            />
            <input
                type="email"
                name="email"
                value={player.email}
                onChange={handleChange}
                placeholder="Email"
                required
            />
            <input
                type="number"
                name="age"
                value={player.age}
                onChange={handleChange}
                placeholder="Age"
                required
            />
            <input
                type="number"
                name="level"
                value={player.level}
                onChange={handleChange}
                placeholder="Level"
                required
            />
            <div className="form-buttons">
                <button type="submit" className="save-btn">
                    <FiCheck /> Save
                </button>
                <button type="button" className="cancel-btn" onClick={() => onPlayerSaved()}>
                    <FiX /> Cancel
                </button>
            </div>
        </form>
    );
}

export default PlayerForm;
