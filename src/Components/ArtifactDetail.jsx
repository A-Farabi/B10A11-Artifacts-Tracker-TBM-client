import { useState, useEffect, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaHistory, FaBook, FaLandmark, FaArrowLeft } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../Auth/AuthProvider';
import axios from 'axios';

const ArtifactDetail = () => {
    const artifact = useLoaderData();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [likeCount, setLikeCount] = useState(artifact.likeCount || 0);
    const [isLiked, setIsLiked] = useState(false);
    const [loadingLike, setLoadingLike] = useState(false);

    // Check if current user has liked this artifact
    useEffect(() => {
        const checkLikeStatus = async () => {
            if (user) {
                try {
                    const response = await axios.get(`http://localhost:5000/artifacts/${artifact._id}/like-status`, {
                        params: { userId: user.uid }
                    });
                    setIsLiked(response.data.liked);
                } catch (error) {
                    console.error('Error checking like status:', error);
                }
            }
        };
        checkLikeStatus();
    }, [user, artifact._id]);

    const handleLike = async () => {
        if (!user) {
            toast.error('Please log in to like artifacts');
            return;
        }

        setLoadingLike(true);
        try {
            const response = await axios.patch(`http://localhost:5000/artifacts/${artifact._id}/like`, {
                userId: user.uid
            });

            setIsLiked(response.data.liked);
            setLikeCount(prev => response.data.liked ? prev + 1 : prev - 1);
            
            toast.success(response.data.liked ? 'Artifact liked!' : 'Like removed', {
                position: "top-center",
                autoClose: 2000,
            });
        } catch (error) {
            console.error('Error updating like:', error);
            toast.error(error.response?.data?.error || 'Failed to update like status');
        } finally {
            setLoadingLike(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                {/* Back Button */}
                <button 
                    onClick={() => navigate(-1)}
                    className="flex items-center text-indigo-600 hover:text-indigo-800 mb-6"
                >
                    <FaArrowLeft className="mr-2" />
                    Back to artifacts
                </button>

                {/* Artifact Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">{artifact.name}</h1>
                    <div className="flex justify-center items-center gap-2">
                        <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center">
                            <FaHistory className="mr-1" /> {artifact.type}
                        </span>
                        <span className="bg-amber-100 text-amber-800 px-3 py-1 rounded-full text-sm flex items-center">
                            <FaCalendarAlt className="mr-1" /> {artifact.createdAt}
                        </span>
                    </div>
                </div>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="md:flex">
                        {/* Image Section */}
                        <div className="md:w-1/2 relative">
                            <img 
                                src={artifact.image} 
                                alt={artifact.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src = 'https://via.placeholder.com/800x600?text=Image+Not+Available';
                                }}
                            />
                            <button 
                                onClick={handleLike}
                                disabled={loadingLike}
                                className={`absolute top-4 right-4 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-colors ${loadingLike ? 'opacity-50 cursor-not-allowed' : ''}`}
                                aria-label={isLiked ? 'Unlike artifact' : 'Like artifact'}
                            >
                                {isLiked ? (
                                    <FaHeart className="text-red-500 text-2xl" />
                                ) : (
                                    <FaRegHeart className="text-gray-600 text-2xl" />
                                )}
                            </button>
                            <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-full shadow-md">
                                <span className="font-medium text-gray-800">
                                    {likeCount} {likeCount === 1 ? 'like' : 'likes'}
                                </span>
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="p-8 md:w-1/2">
                            <div className="mb-8">
                                <h2 className="text-2xl font-semibold text-gray-900 mb-4 flex items-center">
                                    <FaBook className="mr-2 text-indigo-600" /> Historical Context
                                </h2>
                                <p className="text-gray-700 leading-relaxed">
                                    {artifact.historicalContext}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Discovery Info */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                        <FaUser className="mr-2 text-amber-600" /> Discovery
                                    </h3>
                                    <div className="space-y-2">
                                        <p className="text-gray-700">
                                            <span className="font-medium">Discovered in:</span> {artifact.discoveredAt}
                                        </p>
                                        <p className="text-gray-700">
                                            <span className="font-medium">By:</span> {artifact.discoveredBy}
                                        </p>
                                    </div>
                                </div>

                                {/* Current Location */}
                                <div className="bg-gray-50 p-4 rounded-lg">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                        <FaMapMarkerAlt className="mr-2 text-emerald-600" /> Current Location
                                    </h3>
                                    <p className="text-gray-700">{artifact.presentLocation}</p>
                                </div>

                                {/* Contributor Info */}
                                <div className="bg-gray-50 p-4 rounded-lg md:col-span-2">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                                        <FaLandmark className="mr-2 text-purple-600" /> Contributor
                                    </h3>
                                    <p className="text-gray-700">
                                        <span className="font-medium">Added by:</span> {artifact.adderName}
                                    </p>
                                    <p className="text-gray-700">
                                        <span className="font-medium">Contact:</span> {artifact.adderEmail}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Information Section */}
                <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
                    <h2 className="text-2xl font-semibold text-gray-900 mb-6">Additional Details</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-indigo-50 p-4 rounded-lg">
                            <h3 className="font-medium text-indigo-800 mb-2">Artifact ID</h3>
                            <p className="text-gray-700">{artifact._id}</p>
                        </div>
                        <div className="bg-amber-50 p-4 rounded-lg">
                            <h3 className="font-medium text-amber-800 mb-2">Creation Period</h3>
                            <p className="text-gray-700">{artifact.createdAt}</p>
                        </div>
                        <div className="bg-emerald-50 p-4 rounded-lg">
                            <h3 className="font-medium text-emerald-800 mb-2">Category</h3>
                            <p className="text-gray-700">{artifact.type}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ArtifactDetail;