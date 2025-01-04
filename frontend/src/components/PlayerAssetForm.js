import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

function PlayerAssetForm({ onPlayerAssetAdded }) {
    const [playerId, setPlayerId] = useState('');
    const [assetId, setAssetId] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newPlayerAsset = {
            playerId: playerId,
            assetId: assetId,
        };

        try {
            const response = await axiosInstance.post('/PlayerAsset', newPlayerAsset);
            onPlayerAssetAdded(response.data);
        } catch (error) {
            console.error('Error assigning asset to player:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={playerId}
                onChange={(e) => setPlayerId(e.target.value)}
                placeholder="Player ID"
                required
            />
            <input
                type="text"
                value={assetId}
                onChange={(e) => setAssetId(e.target.value)}
                placeholder="Asset ID"
                required
            />
            <button type="submit">Assign Asset to Player</button>
        </form>
    );
}

export default PlayerAssetForm;
