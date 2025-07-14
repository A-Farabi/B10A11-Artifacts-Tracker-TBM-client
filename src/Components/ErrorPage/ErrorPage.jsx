import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
import { FaExclamationTriangle, FaHome, FaHistory } from 'react-icons/fa';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  // Determine error message based on status code
  let errorMessage = 'An unexpected error occurred';
  let errorTitle = 'Oops! Something went wrong';
  
  if (error.status === 404) {
    errorTitle = 'Page Not Found';
    errorMessage = 'The artifact or page you\'re looking for doesn\'t exist or may have been moved.';
  } else if (error.status === 401) {
    errorTitle = 'Unauthorized';
    errorMessage = 'You need to be logged in to access this ancient knowledge.';
  } else if (error.status === 403) {
    errorTitle = 'Forbidden';
    errorMessage = 'You don\'t have permission to access this archaeological treasure.';
  } else if (error.status === 500) {
    errorTitle = 'Server Error';
    errorMessage = 'Our servers are currently excavating some issues. Please try again later.';
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-lg shadow-md overflow-hidden p-6">
          <div className="text-center">
            <div className="text-red-500 mb-6 flex justify-center">
              <FaExclamationTriangle className="text-6xl" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{errorTitle}</h1>
            <p className="text-xl text-gray-600 mb-8">{errorMessage}</p>
            
            {process.env.NODE_ENV === 'development' && (
              <div className="bg-gray-50 p-4 rounded mb-8 text-left">
                <p>{error.statusText || error.message}</p>
                <pre className="whitespace-pre-wrap break-words text-sm text-gray-700 mt-2">
                  {error.stack}
                </pre>
              </div>
            )}
            
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link
                to="/"
                className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaHome className="mr-2" /> Return Home
              </Link>
              <Link
                to="/artifacts"
                className="flex items-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                <FaHistory className="mr-2" /> Browse Artifacts
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;