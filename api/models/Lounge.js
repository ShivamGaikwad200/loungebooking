import mongoose from "mongoose";
const { Schema } = mongoose;

const LoungeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  photos: {
    type: [String]
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  featured: {
    type: Boolean,
    default: false
  },
  maxPersons: {
    type: Number,
    required: true
  },
  cost: {
    type: Number,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Lounge", LoungeSchema);
