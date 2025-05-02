import "./bookingPage.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const loungeId = location.state?.loungeId;
  const totalPrice = location.state?.totalPrice;

  const [services, setServices] = useState([]);
  const [bookingDate, setBookingDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [occasion, setOccasion] = useState("");
  const [generatorBackup, setGeneratorBackup] = useState("No");
  const [additionalFurniture, setAdditionalFurniture] = useState("No");
  const [additionalLighting, setAdditionalLighting] = useState("No");
  const [additionalWaiters, setAdditionalWaiters] = useState("No");
  const [catering, setCatering] = useState("OI");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        userId: user._id,
        loungeId,
        services,
        bookingDate,
        timeSlot,
        totalPrice,
        occasion,
        generatorBackup,
        additionalFurniture,
        additionalLighting,
        additionalWaiters,
        catering,
      };

      await axios.post("/bookings", bookingData);
      alert("Booking successfully created!");
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Booking failed.");
    }
  };

  const handleServiceChange = (service) => {
    if (services.includes(service)) {
      setServices(services.filter((s) => s !== service));
    } else {
      setServices([...services, service]);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="bookingContainer">
        <h1>Book Your Lounge</h1>
        <form onSubmit={handleSubmit} className="bookingForm">
          <div>
            <label>Booking Date:</label>
            <input
              type="date"
              value={bookingDate}
              onChange={(e) => setBookingDate(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Time Slot:</label>
            <input
              type="text"
              placeholder="e.g. 6:00 PM - 9:00 PM"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Occasion:</label>
            <input
              type="text"
              placeholder="e.g. Birthday, Wedding"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              required
            />
          </div>

          <div>
            <label>Services:</label>
            <div className="servicesOptions">
              {["DJ", "Photography", "Decoration", "Live Music"].map((service) => (
                <label key={service}>
                  <input
                    type="checkbox"
                    value={service}
                    checked={services.includes(service)}
                    onChange={() => handleServiceChange(service)}
                  />
                  {service}
                </label>
              ))}
            </div>
          </div>

          <div className="bookingOptions">
            <label>Generator Backup:</label>
            <select value={generatorBackup} onChange={(e) => setGeneratorBackup(e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label>Additional Furniture:</label>
            <select value={additionalFurniture} onChange={(e) => setAdditionalFurniture(e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label>Additional Lighting:</label>
            <select value={additionalLighting} onChange={(e) => setAdditionalLighting(e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label>Additional Waiters:</label>
            <select value={additionalWaiters} onChange={(e) => setAdditionalWaiters(e.target.value)}>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>

            <label>Catering:</label>
            <select value={catering} onChange={(e) => setCatering(e.target.value)}>
              <option value="OI">OI</option>
              <option value="Outsourced">Outsourced</option>
            </select>
          </div>

          <h2>Total Price: ${totalPrice}</h2>

          <button type="submit" className="submitBookingBtn">Confirm Booking</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
