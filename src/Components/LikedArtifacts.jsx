import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaHistory, FaCalendarAlt } from 'react-icons/fa';
import { AuthContext } from '../Auth/AuthProvider';
import axios from 'axios';
import useDocumentTitle from '../Hooks/UseDocumentTitle';

const LikedArtifacts = () => {
    useDocumentTitle('Liked Artifacts')
    const { user } = useContext(AuthContext);
    const [likedArtifacts, setLikedArtifacts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLikedArtifacts = async () => {
            if (user) {
                try {
                    const response = await axios.get(`https://b10-a11-artifacts-tracker-tbm-serve.vercel.app/users/${user.uid}/liked-artifacts`);
                    setLikedArtifacts(response.data);
                } catch (error) {
                    console.error('Error fetching liked artifacts:', error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchLikedArtifacts();
    }, [user]);

    if (loading) {
        return <div className="text-center py-12">Loading...</div>;
    }

    if (!likedArtifacts.length) {
        return (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">No Liked Artifacts Yet</h2>
                    <p className="text-gray-600 mb-6">
                        You haven't liked any artifacts yet. Browse our collection and like your favorites!
                    </p>
                    <Link
                        to="/all-artifacts"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Browse Artifacts
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-3xl font-bold text-gray-900">Your Liked Artifacts</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        {likedArtifacts.length} {likedArtifacts.length === 1 ? 'artifact' : 'artifacts'} you've liked
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {likedArtifacts.map(artifact => (
                        <div key={artifact._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                            <div className="h-48 overflow-hidden">
                                <img 
                                    src={artifact.image} 
                                    alt={artifact.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 mb-2">{artifact.name}</h2>
                                <div className="flex items-center text-gray-600 mb-4">
                                    <FaHeart className="text-red-500 mr-2" />
                                    <span>{artifact.likeCount || 0} likes</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center text-gray-600">
                                        <FaHistory className="mr-2 text-indigo-500" />
                                        <span className="text-sm">{artifact.type}</span>
                                    </div>
                                    <Link
                                        to={`/all-artifacts/${artifact._id}`}
                                        className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LikedArtifacts;