import React from 'react';
import PlayerList from './components/PlayerList';
import AssetList from './components/AssetList';
import PlayerAssetList from './components/PlayerAssetList';
//import './App.css';

function App() {

    return (
        <div>
            <h1>Battle Game API</h1>
            <PlayerList />

            <AssetList />

            <PlayerAssetList />
        </div>
    );
}

export default App;
