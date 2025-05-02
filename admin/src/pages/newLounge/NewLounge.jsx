import "./newLounge.scss"; // reuse your existing style
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { loungeInputs } from "../../formSource";
import axios from "axios";

const NewLounge = () => {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newLounge = {
        ...info,
        photos: info.photos.split(",").map((url) => url.trim()),
        rating: parseFloat(info.rating),
        maxPersons: parseInt(info.maxPersons),
        cost: parseFloat(info.cost),
        featured: info.featured === "true"
      };

      console.log("Sending lounge:", newLounge);

      const response = await axios.post("/lounges", newLounge);
      console.log("Lounge added successfully!", response.data);
    } catch (err) {
      console.error("Error adding lounge:", err.response?.data);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Lounge</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {loungeInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}

              <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>

              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewLounge;
