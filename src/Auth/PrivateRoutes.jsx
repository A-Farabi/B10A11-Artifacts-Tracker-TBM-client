import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

const PrivateRoutes = ({children}) => {

    const {user} = useContext(AuthContext)

    if (user) {
        return children
    }
    
    
    return (
        <div>
           <Navigate to="/login"></Navigate>
        </div>
    );
};

export default PrivateRoutes;