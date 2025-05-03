import Booking from "../models/Booking.js";

// Create a new booking
export const createBooking = async (req, res, next) => {
  const { loungeId, startDate, endDate } = req.body;

  try {
    // Check for overlapping bookings in the same lounge
    const existingBooking = await Booking.findOne({
      loungeId,
      $or: [
        {
          startDate: { $lte: new Date(endDate) },
          endDate: { $gte: new Date(startDate) },
        },
      ],
      status: { $ne: "Rejected" } // Optional: ignore rejected bookings
    });

    if (existingBooking) {
      return res.status(400).json({
        message: "This lounge is already booked during the selected dates.",
      });
    }

    const newBooking = new Booking(req.body);
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (err) {
    next(err);
  }
};

// Update booking status (e.g., confirm, cancel, complete)
export const updateBookingStatus = async (req, res, next) => {
  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      req.params.id,
      { $set: { status: req.body.status } },
      { new: true }
    );
    res.status(200).json(updatedBooking);
  } catch (err) {
    next(err);
  }
};

// Get a single booking by ID
export const getBooking = async (req, res, next) => {
  try {
    const booking = await Booking.findById(req.params.id);
    res.status(200).json(booking);
  } catch (err) {
    next(err);
  }
};

// Get all bookings by a specific user
export const getBookingsByUser = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ userId: req.params.userId });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

// Get all bookings for a specific lounge
export const getBookingsByLounge = async (req, res, next) => {
  try {
    const bookings = await Booking.find({ loungeId: req.params.loungeId });
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

// Get all bookings in the system
export const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json(bookings);
  } catch (err) {
    next(err);
  }
};

// Delete a booking
export const deleteBooking = async (req, res, next) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(200).json("Booking deleted successfully");
  } catch (err) {
    next(err);
  }
};
