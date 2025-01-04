import React, { useState, useEffect } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import PlayerForm from './PlayerForm';
import axiosInstance from '../axiosInstance';
import '../styles/player.css';

function PlayerList() {
    const [players, setPlayers] = useState([]);
    const [editingPlayer, setEditingPlayer] = useState(null);

    const fetchPlayers = async () => {
        try {
            const response = await axiosInstance.get('/Player');
            setPlayers(response.data.$values || []);
        } catch (error) {
            console.error('Error fetching players:', error);
        }
    };

    const deletePlayer = async (playerId) => {
        try {
            await axiosInstance.delete(`/Player/${playerId}`);
            fetchPlayers();
        } catch (error) {
            console.error('Error deleting player:', error);
        }
    };

    const handlePlayerSaved = () => {
        setEditingPlayer(null);
        fetchPlayers();
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <div className="player-list">
            <h2>Player Management</h2>
            <PlayerForm onPlayerSaved={handlePlayerSaved} existingPlayer={editingPlayer} />
            <ul>
                {players.map((player) => (
                    <li key={player.playerId}>
                        <span>
                            Id: {player.playerId}
                        </span>
                        <span>
                            {player.playerName} - {player.age} years old
                        </span>
                        
                        <span className="actions">
                            <button onClick={() => setEditingPlayer(player)}>
                                <FiEdit />
                            </button>
                            <button onClick={() => deletePlayer(player.playerId)}>
                                <FiTrash />
                            </button>
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerList;
