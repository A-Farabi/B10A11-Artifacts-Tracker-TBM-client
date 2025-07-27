import { useState, useContext } from 'react';
import { AuthContext } from '../Auth/AuthProvider';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const AddArtifacts = () => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Artifact types for dropdown
  const artifactTypes = [
    "Tools",
    "Weapons",
    "Documents",
    "Writings",
    "Jewelry",
    "Pottery",
    "Sculptures",
    "Coins",
    "Textiles",
    "Other"
  ];

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    type: artifactTypes[0], // Default to first type
    historicalContext: '',
    createdAt: '',
    discoveredAt: '',
    discoveredBy: '',
    presentLocation: '',
    adderName: user?.displayName || '',
    adderEmail: user?.email || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Basic validation
    // if (!formData.name || !formData.image) {
    //   toast.error('Artifact name and image URL are required');
    //   setIsSubmitting(false);
    //   return;
    // }

    try {
      // Here you would typically make an API call to your backend
    await axios.post('http://localhost:5000/add-artifacts', formData,{
      headers:{
        "Content-Type":'application/json'
      }
    })
      .then(res => res.data)
      // const response = await axios.post('/api/artifacts', formData);
      
      // Simulate successful submission
      console.log('Artifact data to submit:', formData);
      
      toast.success('Artifact added successfully!');
      // Reset form after submission
      setFormData({
        name: '',
        image: '',
        type: artifactTypes[0],
        historicalContext: '',
        createdAt: '',
        discoveredAt: '',
        discoveredBy: '',
        presentLocation: '',
        adderName: user?.displayName || '',
        adderEmail: user?.email || ''
      });

    } catch (error) {
      console.error('Error adding artifact:', error);
      toast.error(error.response?.data?.message || 'Failed to add artifact');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Add New Artifact</h2>
          <p className="mt-2 text-lg text-gray-600">
            Contribute to our historical collection
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Artifact Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Artifact Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Artifact Image URL */}
            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Artifact Image URL *
              </label>
              <input
                type="url"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="https://example.com/artifact.jpg"
              />
              {formData.image && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500">Image Preview:</p>
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="mt-1 h-32 object-contain border rounded"
                    onError={(e) => e.target.style.display = 'none'}
                  />
                </div>
              )}
            </div>

            {/* Artifact Type Dropdown */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                Artifact Type
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              >
                {artifactTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Historical Context */}
            <div>
              <label htmlFor="historicalContext" className="block text-sm font-medium text-gray-700">
                Historical Context
              </label>
              <textarea
                id="historicalContext"
                name="historicalContext"
                rows={4}
                value={formData.historicalContext}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Created At */}
              <div>
                <label htmlFor="createdAt" className="block text-sm font-medium text-gray-700">
                  Created At (e.g., "100 BC")
                </label>
                <input
                  type="text"
                  id="createdAt"
                  name="createdAt"
                  value={formData.createdAt}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              {/* Discovered At */}
              <div>
                <label htmlFor="discoveredAt" className="block text-sm font-medium text-gray-700">
                  Discovered At (e.g., "1799")
                </label>
                <input
                  type="text"
                  id="discoveredAt"
                  name="discoveredAt"
                  value={formData.discoveredAt}
                  onChange={handleChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Discovered By */}
            <div>
              <label htmlFor="discoveredBy" className="block text-sm font-medium text-gray-700">
                Discovered By
              </label>
              <input
                type="text"
                id="discoveredBy"
                name="discoveredBy"
                value={formData.discoveredBy}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Present Location */}
            <div>
              <label htmlFor="presentLocation" className="block text-sm font-medium text-gray-700">
                Present Location
              </label>
              <input
                type="text"
                id="presentLocation"
                name="presentLocation"
                value={formData.presentLocation}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>

            {/* Contributor Info (read-only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-md">
              <div>
                <label htmlFor="adderName" className="block text-sm font-medium text-gray-700">
                  Contributor Name
                </label>
                <input
                  type="text"
                  id="adderName"
                  name="adderName"
                  value={formData.adderName}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label htmlFor="adderEmail" className="block text-sm font-medium text-gray-700">
                  Contributor Email
                </label>
                <input
                  type="email"
                  id="adderEmail"
                  name="adderEmail"
                  value={formData.adderEmail}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  isSubmitting ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                {isSubmitting ? 'Adding Artifact...' : 'Add Artifact'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddArtifacts;