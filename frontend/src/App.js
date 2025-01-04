import React, { useState } from 'react';
import PlayerList from './components/PlayerList';
import PlayerForm from './components/PlayerForm';
import AssetList from './components/AssetList';
import AssetForm from './components/AssetForm';
import PlayerAssetList from './components/PlayerAssetList';
import PlayerAssetForm from './components/PlayerAssetForm';
import './App.css';

function App() {
    const [players, setPlayers] = useState([]);
    const [assets, setAssets] = useState([]);
    const [playerAssets, setPlayerAssets] = useState([]);

    const handlePlayerAdded = (player) => {
        setPlayers([...players, player]);
    };

    const handleAssetAdded = (asset) => {
        setAssets([...assets, asset]);
    };

    const handlePlayerAssetAdded = (playerAsset) => {
        setPlayerAssets([...playerAssets, playerAsset]);
    };

    return (
        <div>
            <h1>Battle Game API</h1>

            <PlayerForm onPlayerAdded={handlePlayerAdded} />
            <PlayerList />

            <AssetForm onAssetAdded={handleAssetAdded} />
            <AssetList />

            <PlayerAssetForm onPlayerAssetAdded={handlePlayerAssetAdded} />
            <PlayerAssetList />
        </div>
    );
}

export default App;
