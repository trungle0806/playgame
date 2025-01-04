import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';

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

    return (
        <div>
            <h2>Player-Asset Associations</h2>
            <ul>
                {playerAssets.map(pa => (
                    <li key={`${pa.playerId}-${pa.assetId}`}>
                        Player: {pa.player.playerName}, Asset: {pa.asset.assetName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PlayerAssetList;
