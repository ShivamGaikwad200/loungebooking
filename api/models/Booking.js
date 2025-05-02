import mongoose from "mongoose";
const { Schema } = mongoose;

const BookingSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true
  },
  loungeId: {
    type: String,
    required: true
  },
  services: {
    type: [String],
    required: true
  },
  bookingDate: {
    type: Date,
    required: true
  },
  timeSlot: {
    type: String, // e.g. "12:00 PM - 2:00 PM"
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    default: "pending" // pending | confirmed | cancelled
  },

  // New Fields
  occasion: {
    type: String,
    required: true // e.g. Birthday, Wedding, Corporate Event
  },
  generatorBackup: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  additionalFurniture: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  additionalLighting: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  additionalWaiters: {
    type: String,
    enum: ["Yes", "No"],
    required: true
  },
  catering: {
    type: String,
    enum: ["OI", "Outsourced"],
    required: true
  }

}, { timestamps: true });

export default mongoose.model("Booking", BookingSchema);
