import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';

const MyArtifacts = () => {
    const [artifacts, setArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentArtifact, setCurrentArtifact] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        image: '',
        type: '',
        historicalContext: '',
        createdAt: '',
        discoveredAt: '',
        discoveredBy: '',
        presentLocation: ''
    });
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchArtifacts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/my-artifacts', {
                    withCredentials: true
                });
                
                if (response.data.success) {
                    setArtifacts(response.data.artifacts || []);
                }
            } catch (error) {
                console.error('Error fetching artifacts:', error);
                toast.error(error.response?.data?.error || 'Failed to fetch artifacts');
            } finally {
                setLoading(false);
            }
        };

        if (user?.email) {
            fetchArtifacts();
        } else {
            setLoading(false);
        }
    }, [user]);

    const handleOpenModal = (artifact) => {
        setCurrentArtifact(artifact);
        setFormData({
            name: artifact.name,
            image: artifact.image,
            type: artifact.type,
            historicalContext: artifact.historicalContext,
            createdAt: artifact.createdAt,
            discoveredAt: artifact.discoveredAt,
            discoveredBy: artifact.discoveredBy,
            presentLocation: artifact.presentLocation
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setCurrentArtifact(null);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdate = async () => {
        try {
            const response = await axios.patch(
                `http://localhost:5000/update-artifact/${currentArtifact._id}`,
                formData,
                { withCredentials: true }
            );
            
            if (response.data.success) {
                toast.success('Artifact updated successfully');
                setArtifacts(artifacts.map(artifact => 
                    artifact._id === currentArtifact._id ? { ...artifact, ...formData } : artifact
                ));
                handleCloseModal();
            }
        } catch (error) {
            console.error('Error updating artifact:', error);
            toast.error(error.response?.data?.error || 'Failed to update artifact');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this artifact?')) return;
        
        try {
            const response = await axios.delete(
                `http://localhost:5000/delete-artifact/${id}`,
                { withCredentials: true }
            );
            
            if (response.data.success) {
                toast.success('Artifact deleted successfully');
                setArtifacts(artifacts.filter(artifact => artifact._id !== id));
            }
        } catch (error) {
            console.error('Error deleting artifact:', error);
            toast.error(error.response?.data?.error || 'Failed to delete artifact');
        }
    };

    if (loading) {
        return <div className="text-center py-8">Loading your artifacts...</div>;
    }

    if (!user?.email) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4">Please log in to view your artifacts</h2>
                <button 
                    onClick={() => navigate('/login')}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                >
                    Go to Login
                </button>
            </div>
        );
    }

    if (artifacts.length === 0) {
        return (
            <div className="text-center py-8">
                <h2 className="text-2xl font-bold mb-4">No Artifacts Found</h2>
                <p className="mb-4">You haven't added any artifacts yet.</p>
                <button 
                    onClick={() => navigate('/add-artifacts')}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                >
                    Add Your First Artifact
                </button>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">My Artifacts</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {artifacts.map(artifact => (
                    <div key={artifact._id} className="border rounded-lg p-6 shadow-md hover:shadow-lg transition">
                        {/* Artifact Image */}
                        <div className="mb-4 h-48 overflow-hidden rounded-md">
                            <img 
                                src={artifact.image} 
                                alt={artifact.name} 
                                className="w-full h-full object-cover"
                            />
                        </div>
                        
                        {/* Artifact Details */}
                        <div className="space-y-2">
                            <h3 className="text-xl font-bold text-gray-800">{artifact.name}</h3>
                            <p className="text-sm text-gray-500">Type: {artifact.type}</p>
                            
                            <div className="border-t pt-2 mt-2">
                                <p className="text-gray-700">
                                    <span className="font-semibold">Historical Context:</span> {artifact.historicalContext}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Created:</span> {artifact.createdAt}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Discovered:</span> {artifact.discoveredAt} by {artifact.discoveredBy}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">Current Location:</span> {artifact.presentLocation}
                                </p>
                            </div>
                            
                            {/* Added By */}
                            <div className="border-t pt-2 mt-2 text-sm text-gray-500">
                                Added by {artifact.adderName} ({artifact.adderEmail})
                            </div>
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="flex justify-between mt-4">
                            <button
                                onClick={() => handleOpenModal(artifact)}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                            >
                                Update
                            </button>
                            <button
                                onClick={() => handleDelete(artifact._id)}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Update Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-bold mb-4">Update Artifact</h2>
                        
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image URL</label>
                                <input
                                    type="text"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Type</label>
                                <input
                                    type="text"
                                    name="type"
                                    value={formData.type}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Historical Context</label>
                                <textarea
                                    name="historicalContext"
                                    value={formData.historicalContext}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    rows="3"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Created At</label>
                                    <input
                                        type="text"
                                        name="createdAt"
                                        value={formData.createdAt}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Discovered At</label>
                                    <input
                                        type="text"
                                        name="discoveredAt"
                                        value={formData.discoveredAt}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Discovered By</label>
                                <input
                                    type="text"
                                    name="discoveredBy"
                                    value={formData.discoveredBy}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700">Current Location</label>
                                <input
                                    type="text"
                                    name="presentLocation"
                                    value={formData.presentLocation}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 mt-6">
                            <button
                                onClick={handleCloseModal}
                                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleUpdate}
                                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyArtifacts;