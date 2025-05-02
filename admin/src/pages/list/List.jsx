import "./list.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Datatable from "../../components/datatable/Datatable";
import {
  userColumns,
  hotelColumns,
  roomColumns,
  loungeColumns,
  bookingColumns,
} from "../../datatablesource";
import { useLocation } from "react-router-dom";

const List = () => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const columns =
    path === "users"
      ? userColumns
      : path === "hotels"
      ? hotelColumns
      : path === "rooms"
      ? roomColumns
      : path === "lounges"
      ? loungeColumns
      : path === "bookings"
      ? bookingColumns
      : [];

  return (
    <div className="list">
      <Sidebar />
      <div className="listContainer">
        <Navbar />
        <Datatable columns={columns} />
      </div>
    </div>
  );
};

export default List;
