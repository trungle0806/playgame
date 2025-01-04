import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import PlayerAssetForm from './PlayerAssetForm'; // Import the form
import { FaTrash } from 'react-icons/fa';
import '../styles/PlayerAsset.css';

function PlayerAssetList() {
    const [playerAssets, setPlayerAssets] = useState([]);

    useEffect(() => {
        const fetchPlayerAssets = async () => {
            try {
                const response = await axiosInstance.get('/PlayerAsset');
                setPlayerAssets(response.data.$values || []);
            } catch (error) {
                console.error('Error fetching player assets:', error);
            }
        };

        fetchPlayerAssets();
    }, []);

    const handleDelete = async (playerId, assetId) => {
        try {
            await axiosInstance.delete(`/PlayerAsset/${playerId}/${assetId}`);
            setPlayerAssets((prev) =>
                prev.filter((pa) => pa.playerId !== playerId || pa.assetId !== assetId)
            );
        } catch (error) {
            console.error('Error deleting player asset:', error);
        }
    };

    const handlePlayerAssetAdded = (newPlayerAsset) => {
        setPlayerAssets((prev) => [...prev, newPlayerAsset]);
    };

    return (
        <div className="player-asset-list">
            <h2>Player-Asset Associations</h2>
            {/* Add the form at the top */}
            <PlayerAssetForm onPlayerAssetAdded={handlePlayerAssetAdded} />

            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Asset</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {playerAssets.map((pa) => (
                        <tr key={`${pa.playerId}-${pa.assetId}`}>
                            <td>{pa.player.playerName}</td>
                            <td>{pa.asset.assetName}</td>
                            <td>
                                <button
                                    className="delete-btn"
                                    onClick={() => handleDelete(pa.playerId, pa.assetId)}
                                >
                                    <FaTrash /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default PlayerAssetList;
