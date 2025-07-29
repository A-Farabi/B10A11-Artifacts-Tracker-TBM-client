import { Link } from 'react-router-dom';
import { FaEye, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';

const FeaturedArtifacts = () => {
  const [artifacts, setArtifacts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/most-liked-artifacts?limit=6')
      .then(res => setArtifacts(res.data))
      .catch(err => console.error('Error fetching most liked artifacts:', err));
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Most Popular Artifacts</h2>
          <p className="mt-2 text-lg text-gray-600">
            Discover our community's favorite historical pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artifacts.map((artifact) => (
            <div key={artifact._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden relative">
                <img 
                  src={artifact.image} 
                  alt={artifact.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/80 rounded-full p-2 flex items-center">
                  <FaHeart className="text-red-500 mr-1" />
                  <span className="text-sm font-medium">{artifact.likeCount || 0}</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{artifact.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {artifact.historicalContext?.substring(0, 100)}...
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {artifact.museumLocation}
                  </span>
                  <Link 
                    to={`/all-artifacts/${artifact._id}`}
                    className="flex items-center text-indigo-600 hover:text-indigo-800"
                  >
                    <FaEye className="mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-12 text-center">
        <Link 
          to="/all-artifacts" 
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          View All Artifacts
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArtifacts;