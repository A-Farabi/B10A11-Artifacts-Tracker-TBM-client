import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';
import Swal from 'sweetalert2';

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
    const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
    });

    if (!result.isConfirmed) return;

    try {
        const response = await axios.delete(
            `http://localhost:5000/delete-artifact/${id}`,
            { withCredentials: true }
        );
        
        if (response.data.success) {
            await Swal.fire({
                title: "Deleted!",
                text: "Your artifact has been deleted.",
                icon: "success"
            });
            setArtifacts(artifacts.filter(artifact => artifact._id !== id));
        }
    } catch (error) {
        console.error('Error deleting artifact:', error);
        await Swal.fire({
            title: "Error!",
            text: error.response?.data?.error || 'Failed to delete artifact',
            icon: "error"
        });
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

            {/* Update Modal starts here*/}
            {showModal && (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-6">
                <h2 className="text-2xl font-bold text-white">Update Artifact</h2>
                <p className="text-blue-100 mt-1">Edit the details of your artifact</p>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Column 1 */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                defaultValue={formData.name}
                                placeholder={formData.name}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                onFocus={(e) => {
                                    if (e.target.value === formData.name) {
                                        e.target.value = '';
                                    }
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        e.target.value = formData.name;
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                defaultValue={formData.image}
                                placeholder={formData.image}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                onFocus={(e) => {
                                    if (e.target.value === formData.image) {
                                        e.target.value = '';
                                    }
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        e.target.value = formData.image;
                                    }
                                }}
                            />
                            {formData.image && (
                                <div className="mt-2 h-40 overflow-hidden rounded-lg border">
                                    <img 
                                        src={formData.image} 
                                        alt="Preview" 
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                            <select
                                name="type"
                                defaultValue={formData.type}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                <option value="" disabled>Select type</option>
                                <option value="Sculptures">Sculptures</option>
                                <option value="Paintings">Paintings</option>
                                <option value="Pottery">Pottery</option>
                                <option value="Jewelry">Jewelry</option>
                                <option value="Tools">Tools</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Column 2 */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Historical Context</label>
                            <textarea
                                name="historicalContext"
                                defaultValue={formData.historicalContext}
                                placeholder={formData.historicalContext}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition min-h-[120px]"
                                rows="4"
                                onFocus={(e) => {
                                    if (e.target.value === formData.historicalContext) {
                                        e.target.value = '';
                                    }
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        e.target.value = formData.historicalContext;
                                    }
                                }}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Created</label>
                                <input
                                    type="date"
                                    name="createdAt"
                                    defaultValue={formData.createdAt}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Discovered</label>
                                <input
                                    type="date"
                                    name="discoveredAt"
                                    defaultValue={formData.discoveredAt}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Discovered By</label>
                            <input
                                type="text"
                                name="discoveredBy"
                                defaultValue={formData.discoveredBy}
                                placeholder={formData.discoveredBy}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                onFocus={(e) => {
                                    if (e.target.value === formData.discoveredBy) {
                                        e.target.value = '';
                                    }
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        e.target.value = formData.discoveredBy;
                                    }
                                }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Current Location</label>
                            <input
                                type="text"
                                name="presentLocation"
                                defaultValue={formData.presentLocation}
                                placeholder={formData.presentLocation}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                onFocus={(e) => {
                                    if (e.target.value === formData.presentLocation) {
                                        e.target.value = '';
                                    }
                                }}
                                onBlur={(e) => {
                                    if (e.target.value === '') {
                                        e.target.value = formData.presentLocation;
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-gray-50 px-6 py-4 flex justify-end space-x-3 border-t">
                <button
                    onClick={handleCloseModal}
                    className="px-6 py-2 text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-100 transition"
                >
                    Cancel
                </button>
                <button
                    onClick={handleUpdate}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition shadow-md"
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