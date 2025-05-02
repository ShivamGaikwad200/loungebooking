import "./navbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(AuthContext);
  const handleLogout = () => {
    dispatch({ type: "LOGOUT" }); // Trigger logout action
    localStorage.removeItem("user"); // Clear user data from localStorage
  };

  return (
    <div className="navbar">
      <div className="navContainer">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">lamabooking</span>
        </Link>

        {user ? (
          <div className="navItems">
            <span className="username">Hello, {user.username}</span>
            <Link to="/my-bookings" className="navLink">
              <button className="navButton">My Bookings</button>
            </Link>
            <button className="navLogout" onClick={handleLogout}>Logout</button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton">Register</button>
            <Link to="/login" className="navLink">
              <button className="navButton">Login</button>
            </Link>
           
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
