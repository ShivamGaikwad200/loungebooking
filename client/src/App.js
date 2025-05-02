import {BrowserRouter,Routes,Route,} from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import Lounge from "./pages/lounge/Lounge";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import LoungeList from "./pages/loungeList/LoungeList";
import BookingPage from "./pages/booking/BookingPage";
import MyBookings from "./pages/mybookings/MyBooking";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/hotels" element={<List/>}/>
        <Route path="/lounges" element={<LoungeList/>}/>
        <Route path="/hotels/:id" element={<Hotel/>}/>
        <Route path="/lounges/:id" element={<Lounge />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/login" element={<Login/>}/>
        <Route path="/my-bookings" element={<MyBookings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
