import express from "express";
import {
  createBooking,
  updateBookingStatus,
  getBooking,
  getBookingsByUser,
  getBookingsByLounge,
  getAllBookings,
  deleteBooking
} from "../controllers/bookingControl.js";

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

export default router;
