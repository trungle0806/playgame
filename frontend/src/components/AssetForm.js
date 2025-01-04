import React, { useState } from 'react';
import { FiSave } from 'react-icons/fi';
import axiosInstance from '../axiosInstance';

function AssetForm({ onAssetAdded }) {
    const [assetName, setAssetName] = useState('');
    const [levelRequire, setLevelRequire] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newAsset = {
            assetName,
            levelRequire: parseInt(levelRequire),
        };

        try {
            const response = await axiosInstance.post('/Asset', newAsset);
            onAssetAdded(response.data);
            setAssetName('');
            setLevelRequire('');
        } catch (error) {
            console.error('Error adding asset:', error);
        }
    };

    return (
        <form className="asset-form" onSubmit={handleSubmit}>
            <input
                type="text"
                value={assetName}
                onChange={(e) => setAssetName(e.target.value)}
                placeholder="Asset Name"
                required
            />
            <input
                type="number"
                value={levelRequire}
                onChange={(e) => setLevelRequire(e.target.value)}
                placeholder="Level Required"
                required
            />
            <button type="submit" className="save-btn">
                <FiSave /> Save
            </button>
        </form>
    );
}

export default AssetForm;
