import "./newBookings.scss"; 
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { bookingInputs } from "../../formSource";
import axios from "axios";

const NewBooking = () => {
  const [info, setInfo] = useState({});

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const newBooking = {
        ...info,
        persons: parseInt(info.persons),
      };

      console.log("Sending booking:", newBooking);

      const response = await axios.post("/bookings", newBooking);
      console.log("Booking added successfully!", response.data);
    } catch (err) {
      console.error("Error adding booking:", err.response?.data);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Booking</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              {bookingInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>

                  {input.type === "select" ? (
                    <select id={input.id} onChange={handleChange}>
                      <option value="">-- Select --</option>
                      {input.options.map((option, idx) => (
                        <option key={idx} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      id={input.id}
                      type={input.type}
                      placeholder={input.placeholder}
                      onChange={handleChange}
                    />
                  )}
                </div>
              ))}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBooking;
