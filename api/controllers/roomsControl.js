import Room  from  "../models/Room.js";
import Hotel from  "../models/Hotel.js";
import { createError } from "../utils/error.js";

export const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;
    const newRoom = new Room(req.body);
  
    try {
      // Save the new room to the database
      const savedRoom = await newRoom.save();
  
      try {
        // Update the hotel by adding the new room's ID
        await Hotel.findByIdAndUpdate(hotelId, {
          $push: { rooms: savedRoom._id },
        });
  
        res.status(201).json(savedRoom);
      } catch (err) {
        next(err); // Pass the error to Express error handler
      }
    } catch (err) {
      next(err); // Pass the error to Express error handler
    }
};


export const updateRoom =async (req,res,next)=>{
    try{
        const update=await Room.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
        res.status(200).json(updateRoom)
    }
    catch(error){
        next(error)
    }
};

export const updateRoomAvailability = async (req, res, next) => {
    try {
      await Room.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(err);
    }
};

export const deleteRoom=async(req,res,next)=>{
    const hotelId=req.params.hotleid;
    try{
        await Room.findByIdAndDelete(req.params.id)
        try{
            await Hotel.findByIdAndUpdate(hotelId,{$pull:{rooms:req.params.id},})

        }
        catch(error){
            next(error);
        }
        res.status(200).json("Room has been deleaated.")
    }   
    catch(error){
        next(error)
    }
};

export const getRoom= async(req,res,next)=>{
    try{
        const room=await Room.findById(req.params.id)
        res.status(200).json(room)
    }
    catch(error){
        next(error)
    }
};

export const getAll=async (req, res,next) => {

    try {
        const rooms = await Room.find(); // Fetch all hotels
        res.status(200).json(rooms);
    } catch (error) {
        next(error)
    }
};

// export const getRooms = async (req, res, next) => {
//   try {
//     const rooms = await Room.find();
//     res.status(200).json(rooms);
//   } catch (err) {
//     next(err);
//   }
// };