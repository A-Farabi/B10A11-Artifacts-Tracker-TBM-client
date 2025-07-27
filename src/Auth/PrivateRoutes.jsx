import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";
import { NewtonsCradle } from "ldrs/react";
import "ldrs/react/NewtonsCradle.css";

const PrivateRoutes = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    // Default values shown
    return (
      <div className="flex justify-center items-center center h-screen">
        <div className="flex justify-center flex-col items-center">
            <NewtonsCradle size="100" speed="1.4" color="red" />
        <h1 className="text-xl mt-3">Component is loading, Please wait...</h1>
        </div>
              </div>
    );
  }

  return user ? children : <Navigate to="/login"></Navigate>;
};

export default PrivateRoutes;
