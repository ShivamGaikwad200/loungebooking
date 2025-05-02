import express from "express";
import { createLounge, getAllLounges, getLounge, deleteLounge } from "../controllers/loungeControl.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// Create a lounge
router.post("/", verifyAdmin, createLounge);

// Get all lounges
router.get("/", getAllLounges);

// Get a single lounge
router.get("/:id", getLounge);

// Delete a lounge
router.delete("/:id", verifyAdmin, deleteLounge);

export default router;
