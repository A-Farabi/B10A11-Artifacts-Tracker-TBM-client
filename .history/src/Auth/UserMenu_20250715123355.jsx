import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../Auth/AuthProvider";
import { toast } from "react-toastify";

const UserMenu = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (!user) return null;

  return (
    <div className="relative ml-4">
      {/* Profile Image with Tooltip */}
      <div className="group relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center focus:outline-none"
        >
          <img
            src={user.photoURL || "https://via.placeholder.com/40"}
            alt="User Profile"
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-100"
          />
        </button>
        {/* Display Name Tooltip */}

        <div className="">
          <div className="absolute -bottom-18 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
            <div>{user.displayName || "User"}</div>
            <div>
              <div>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
          <Link
            to="/my-artifacts"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
            onClick={() => setIsOpen(false)}
          >
            My Artifacts
          </Link>
          <Link
            to="/liked-artifacts"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50"
            onClick={() => setIsOpen(false)}
          >
            Liked Artifacts
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
