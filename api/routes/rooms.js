import express from "express"

import { createRoom, updateRoom,deleteRoom, getRoom, getAll, updateRoomAvailability } from "../controllers/roomsControl.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router=express.Router();

// Create
router.post("/:hotelid",createRoom);
// router.post("/:hotelid",verifyAdmin, createRoom);


//Update
router.put("/:id",verifyAdmin, updateRoom)
router.put("/availability/:id",updateRoomAvailability);

//Delete
router.delete("/:id/:hotelid",verifyAdmin, deleteRoom)

//Get
router.get("/:id",getRoom)

//Get All
router.get("/", getAll);

export default router