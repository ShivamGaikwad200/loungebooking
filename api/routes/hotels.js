import express from "express"

import { createHotel, updateHotel,deleteHotel, getHotel, getAll,countByCity,countByType, getHotelRooms } from "../controllers/hotelControl.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router=express.Router();

// Create
router.post("/",verifyAdmin, createHotel);

//Update
router.put("/:id",verifyAdmin, updateHotel)

//Delete
router.delete("/:id",verifyAdmin, deleteHotel)

//Get
router.get("/find/:id",getHotel)

//Get All
router.get("/", getAll);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id",getHotelRooms)

export default router