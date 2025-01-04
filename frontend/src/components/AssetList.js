import React, { useEffect, useState } from 'react';
import { FiEdit, FiTrash } from 'react-icons/fi';
import axiosInstance from '../axiosInstance';
import AssetForm from './AssetForm';
import AssetEditModal from './AssetEditModal';
import '../styles/assets.css';

function AssetList() {
    const [assets, setAssets] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState(null);

    const fetchAssets = async () => {
        try {
            const response = await axiosInstance.get('/Asset');
            setAssets(response.data.$values || []);
        } catch (error) {
            console.error('Error fetching assets:', error);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axiosInstance.delete(`/Asset/${id}`);
            setAssets(assets.filter(asset => asset.assetId !== id));
        } catch (error) {
            console.error('Error deleting asset:', error);
        }
    };

    const handleAssetAdded = (newAsset) => {
        setAssets([...assets, newAsset]);
    };

    const handleEdit = (asset) => {
        setSelectedAsset(asset);
    };

    const handleAssetUpdated = (updatedAsset) => {
        setAssets(assets.map(asset => (asset.assetId === updatedAsset.assetId ? updatedAsset : asset)));
        setSelectedAsset(null);
    };

    return (
        <div className="asset-list">
            <h2>Asset Management</h2>
            <AssetForm onAssetAdded={handleAssetAdded} />
            <ul>
                {assets.map((asset) => (
                    <li key={asset.assetId} className="asset-item">
                        <span>{asset.assetName} - Level {asset.levelRequire}</span>
                        <div className="asset-actions">
                            <button onClick={() => handleEdit(asset)} className="edit-btn">
                                <FiEdit />
                            </button>
                            <button onClick={() => handleDelete(asset.assetId)} className="delete-btn">
                                <FiTrash />
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            {selectedAsset && (
                <AssetEditModal
                    asset={selectedAsset}
                    onAssetUpdated={handleAssetUpdated}
                    onClose={() => setSelectedAsset(null)}
                />
            )}
        </div>
    );
}

export default AssetList;
