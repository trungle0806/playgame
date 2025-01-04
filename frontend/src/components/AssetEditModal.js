import React, { useState } from 'react';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import axiosInstance from '../axiosInstance';

function AssetEditModal({ asset, onAssetUpdated, onClose }) {
    const [assetName, setAssetName] = useState(asset.assetName);
    const [levelRequire, setLevelRequire] = useState(asset.levelRequire);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedAsset = {
            ...asset,
            assetName,
            levelRequire: parseInt(levelRequire),
        };

        try {
            await axiosInstance.put(`/Asset/${asset.assetId}`, updatedAsset);
            onAssetUpdated(updatedAsset);
        } catch (error) {
            console.error('Error updating asset:', error);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Edit Asset</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={assetName}
                        onChange={(e) => setAssetName(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        value={levelRequire}
                        onChange={(e) => setLevelRequire(e.target.value)}
                        required
                    />
                    <div className="modal-actions">
                        <button type="submit" className="confirm-btn">
                            <FiCheckCircle /> Update
                        </button>
                        <button type="button" className="cancel-btn" onClick={onClose}>
                            <FiXCircle /> Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AssetEditModal;
