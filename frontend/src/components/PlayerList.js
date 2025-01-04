import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

function PlayerList() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                const response = await axiosInstance.get('/Player');
                // Access the players array inside $values
                setPlayers(response.data.$values || []); // Fallback to an empty array if $values is not available
            } catch (error) {
                console.error('Error fetching players:', error);
            }
        };

        fetchPlayers();
    }, []);

    return (
        <div>
            <h2>Players</h2>
            <ul>
                {players.map(player => (
                    <li key={player.playerId}>
                        {player.playerName} - {player.age} years old
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerList;
