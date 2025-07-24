import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaMapMarkerAlt, FaCalendarAlt, FaUser, FaHistory, FaBook, FaLandmark } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ArtifactDetail = () => {
    const artifact = useLoaderData();
    const [likeCount, setLikeCount] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    const handleLike = () => {
        // In a real app, you would make an API call here to update the like count in the database
        const newLikeCount = isLiked ? likeCount - 1 : likeCount + 1;
        setLikeCount(newLikeCount);
        setIsLiked(!isLiked);
        
        toast.success(isLiked ? 'Removed like' : 'Artifact liked!', {
            position: "top-center",
            autoClose: 2000,
        });
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
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
                            />
                            <button 
                                onClick={handleLike}
                                className="absolute top-4 right-4 bg-white/80 p-3 rounded-full shadow-md hover:bg-white transition-colors"
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

            </div>
        </div>
    );
};

export default ArtifactDetail;