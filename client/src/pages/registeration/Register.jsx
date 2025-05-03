import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    country: "",
    city: "",
    phone: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", user);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed.");
    }
  };

  return (
    <div className="register">
      <div className="rContainer">
        <input type="text" placeholder="Username" id="username" onChange={handleChange} className="rInput" />
        <input type="email" placeholder="Email" id="email" onChange={handleChange} className="rInput" />
        <input type="text" placeholder="Country" id="country" onChange={handleChange} className="rInput" />
        <input type="text" placeholder="City" id="city" onChange={handleChange} className="rInput" />
        <input type="text" placeholder="Phone" id="phone" onChange={handleChange} className="rInput" />
        <input type="password" placeholder="Password" id="password" onChange={handleChange} className="rInput" />
        <button onClick={handleClick} className="rButton">Register</button>
        {error && <span className="error">{error}</span>}
      </div>
    </div>
  );
};

export default Register;
