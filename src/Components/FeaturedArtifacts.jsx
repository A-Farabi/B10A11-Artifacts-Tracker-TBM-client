import { Link } from 'react-router-dom';
import { FaEye, FaUniversity } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { RiGalleryView } from 'react-icons/ri';

const FeaturedArtifacts = () => {

  const [artifacts, setArtifacts] = useState([])

  console.log(artifacts.length);

  useEffect(()=>{
    axios.get('http://localhost:5000/all-artifacts')
    .then( res => setArtifacts(res.data))
  },)

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900">Featured Artifacts</h2>
          <p className="mt-2 text-lg text-gray-600">
            Explore some of our most fascinating historical pieces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artifacts.slice(0, 6).map((artifact) => (
            <div key={artifact._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden">
                <img 
                  src={artifact.image} 
                  alt={artifact.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{artifact.name}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {artifact.historicalContext.substring(0, 100)}...
                </p>
                <div className="flex justify-end">
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
      {/* button  */}
      <div className="mt-12 text-center">
        <Link to="/all-artifacts" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          View All Artifacts
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArtifacts;