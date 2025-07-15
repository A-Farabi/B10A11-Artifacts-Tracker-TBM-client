import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../Auth/AuthProvider";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All Artifacts", path: "/all-artifacts" },
    { name: "Add Artifacts", path: "/add-artifacts" },
  ];

  const handleLogout = async () => {
    try {
      await logOut();
      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar bg-base-200 shadow-lg">
      {/* Navbar Start */}
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
          >
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `hover:bg-gray-300 rounded-md ${
                      isActive ? "text-primary" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <NavLink to="/" className="btn btn-ghost text-xl">
          Artifacts Tracker
        </NavLink>
      </div>

      {/* Navbar Center */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `hover:bg-gray-300 rounded-md ${
                    isActive ? "text-primary" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      {/* Navbar End */}
      <div className="navbar-end">
        {user ? (
          <div className="flex items-center gap-4">
            <img
              src={user.photoURL || "https://via.placeholder.com/150"}
              alt="User Avatar"
              className="w-10 h-10 rounded-full object-cover border"
              data-tooltip-id="my-tooltip"
              data-tooltip-content={user.email}
            />

            <button
              onClick={handleLogout}
              className="btn btn-outline btn-error"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="btn btn-outline btn-primary">
            Login
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
