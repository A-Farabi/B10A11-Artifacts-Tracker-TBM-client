import { useLoaderData, Link } from "react-router-dom";
import {
  FaEye,
  FaHistory,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaUniversity,
} from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useDocumentTitle from "../Hooks/UseDocumentTitle";

const AllArtifacts = () => {
  useDocumentTitle('All Artifacts')
  const artifacts = useLoaderData();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Artifact Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our comprehensive collection of historical artifacts from
            around the world
          </p>
        </div>

        {/* Artifacts Grid */}
        {artifacts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <p className="text-gray-500 text-lg">
              No artifacts found in the collection
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {artifacts.map((artifact) => (
              <div
                key={artifact._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Artifact Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={artifact.image}
                    alt={artifact.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/400x300?text=Image+Not+Available";
                    }}
                  />
                </div>

                {/* Artifact Info */}
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                    {artifact.name}
                  </h2>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center text-gray-600">
                      <FaHistory className="mr-2 text-indigo-500" />
                      <span className="text-sm">{artifact.type}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaCalendarAlt className="mr-2 text-amber-500" />
                      <span className="text-sm">{artifact.createdAt}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <FaMapMarkerAlt className="mr-2 text-emerald-500" />
                      <span className="text-sm line-clamp-1">
                        {artifact.presentLocation}
                      </span>
                    </div>
                  </div>

                  {/* View Details Button */}
                  <Link
                    to={`/all-artifacts/${artifact._id}`}
                    className="w-full flex items-center justify-center mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <FaEye className="mr-2" />
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
};

export default AllArtifacts;
