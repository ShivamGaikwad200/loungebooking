import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Reserve = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/hotels/room/${hotelId}`);
  const { dates } = useContext(SearchContext);

  //Manual testing
  // const data = [
  //   {
  //     _id: "1",
  //     title: "Deluxe Room",
  //     desc: "A beautiful deluxe room with sea view",
  //     maxPeople: 3,
  //     price: 120,
  //     roomNumbers: [
  //       { _id: "101", number: 101, unavailableDates: [] },
  //       { _id: "102", number: 102, unavailableDates: ["2025-04-01"] },
  //     ],
  //   },
  //   {
  //     _id: "2",
  //     title: "Standard Room",
  //     desc: "A comfortable standard room",
  //     maxPeople: 2,
  //     price: 80,
  //     roomNumbers: [
  //       { _id: "201", number: 201, unavailableDates: ["2025-04-02"] },
  //       { _id: "202", number: 202, unavailableDates: [] },
  //     ],
  //   },
  // ];



  const getDatesInRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const date = new Date(start.getTime());

    const dates = [];

    while (date <= end) {
      dates.push(new Date(date).getTime());
      date.setDate(date.getDate() + 1);
    }

    return dates;
  };

  // console.log("dates:", dates);
  const alldates =dates?.length > 0 && dates[0]?.startDate && dates[0]?.endDate
    ? getDatesInRange(dates[0].startDate, dates[0].endDate)
    : [];

  const isAvailable = (roomNumber) => {
    const isFound = roomNumber.unavailableDates.some((date) =>
      alldates.includes(new Date(date).getTime())
    );

    return !isFound;
  };

  const handleSelect = (e) => {
    const checked = e.target.checked;
    const value = e.target.value;
    setSelectedRooms(
      checked
        ? [...selectedRooms, value]
        : selectedRooms.filter((item) => item !== value)
    );
  };

  const navigate = useNavigate();

  const handleClick = async () => {
    try {
      await Promise.all(
        selectedRooms.map((roomId) => {
          const res = axios.put(`/rooms/availability/${roomId}`, {
            dates: alldates,
          });
          return res.data;
        })
      );
      setOpen(false);
      navigate("/");
    } catch (err) {}
  };

  // console.log("Fetched data:", data, "Loading:", loading, "Error:", error);
  // console.log("Reserve Data:", data);
  // console.log("Hotel ID:", hotelId);

  return (
    <div className="reserve">
      {/* {console.log("Reserve component is rendering!")}   */}
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">
              {item.roomNumbers.map((roomNumber) => (
                <div className="room">
                  <label>{roomNumber.number}</label>
                  <input
                    type="checkbox"
                    value={roomNumber._id}
                    onChange={handleSelect}
                    disabled={!isAvailable(roomNumber)}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}

        <button onClick={handleClick} className="rButton">
          Reserve Now!
        </button>
      </div>
    </div>
  );
};

export default Reserve;