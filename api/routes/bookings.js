import express from "express";
import {
  createBooking,
  updateBookingStatus,
  getBooking,
  getBookingsByUser,
  getBookingsByLounge,
  getAllBookings,
  deleteBooking,
  getLoungeBooking
} from "../controllers/bookingControl.js";
// import Booking from "../models/Booking.js"; 

import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create a new booking (user)
router.post("/", verifyUser, createBooking);

// Update booking status (admin only)
router.put("/:id/status", verifyAdmin, updateBookingStatus);

// Get a specific booking (user or admin)
router.get("/:id", verifyUser, getBooking);

// Get bookings by user (user themselves or admin)
router.get("/user/:userId", verifyUser, getBookingsByUser);

// Get bookings by lounge (admin only)
router.get("/lounge/:loungeId", verifyAdmin, getBookingsByLounge);

// Get all bookings (admin only)
router.get("/", verifyAdmin, getAllBookings);

// Delete a booking (user themselves or admin)
router.delete("/:id", verifyUser, deleteBooking);

router.get("/booked-dates/:loungeId", getLoungeBooking); 

// router.get("/booked-dates/:loungeId", async (req, res) => {
//   try {
//     const bookings = await Booking.find({ loungeId: req.params.loungeId });

//     const bookedRanges = bookings.map((booking) => ({
//       start: booking.startDate,
//       end: booking.endDate,
//     }));

//     res.status(200).json(bookedRanges);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch booked dates" });
//   }
// });

export default router;
