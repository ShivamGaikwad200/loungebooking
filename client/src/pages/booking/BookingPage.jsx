import "./bookingPage.css";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { isWithinInterval } from "date-fns";
import { eachDayOfInterval } from "date-fns";

const BookingPage = () => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const loungeId = location.state?.loungeId;
  const totalPrice = location.state?.totalPrice;

  const [services, setServices] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [bookedDates, setBookedDates] = useState([]);
  const [occasion, setOccasion] = useState("");
  const [generatorBackup, setGeneratorBackup] = useState("No");
  const [additionalFurniture, setAdditionalFurniture] = useState("No");
  const [additionalLighting, setAdditionalLighting] = useState("No");
  const [additionalWaiters, setAdditionalWaiters] = useState("No");
  const [catering, setCatering] = useState("OI");

  useEffect(() => {
    const fetchBookedDates = async () => {
      try {
        const res = await axios.get(`/bookings/booked-dates/${loungeId}`);
        const ranges = res.data;
        const allBookedDates = [];

        ranges.forEach(({ start, end }) => {
          const interval = eachDayOfInterval({
            start: new Date(start),
            end: new Date(end),
          });
          allBookedDates.push(...interval);
        });

        setBookedDates(allBookedDates);
      } catch (err) {
        console.error("Error fetching booked dates:", err);
      }
    };

    if (loungeId) fetchBookedDates();
  }, [loungeId]);

  // Function to check if a date is blocked
  const isDateBlocked = (date) => {
    return bookedDates.some((bookedDate) => 
      bookedDate.getDate() === date.getDate() && 
      bookedDate.getMonth() === date.getMonth() &&
      bookedDate.getFullYear() === date.getFullYear()
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const bookingData = {
        userId: user._id,
        userName: user.username,
        loungeId,
        services,
        startDate,
        endDate,
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
      if (
        err.response &&
        err.response.status === 400 &&
        err.response.data.message === "This lounge is already booked during the selected dates."
      ) {
        alert("Booking failed: Selected dates are already booked for this lounge.");
      } else {
        console.error(err);
        alert("Booking failed. Please try again.");
      }
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
            <label>Booking Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => {
                setStartDate(date);
                setEndDate(null);
              }}
              filterDate={(date) => !isDateBlocked(date)} // Disable dates in bookedDates array
              selectsStart
              startDate={startDate}
              endDate={endDate}
              placeholderText="Select Start Date"
              required
              minDate={new Date()} // Prevent selecting past dates
            />
          </div>

          <div>
            <label>Booking End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              filterDate={(date) => !isDateBlocked(date)} // Disable dates in bookedDates array
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              placeholderText="Select End Date"
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

          <h2>
            Total Price: $
            {startDate && endDate
              ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) * totalPrice
              : 0}
          </h2>

          <button type="submit" className="submitBookingBtn">Confirm Booking</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default BookingPage;
