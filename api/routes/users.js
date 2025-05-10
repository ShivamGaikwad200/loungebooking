import express from "express"

import {updateUser,deleteUser, getUser, getAll,getUserCount } from "../controllers/userControl.js";
import { verifyToken,verifyUser,verifyAdmin } from "../utils/verifyToken.js";
import User from "../models/User.js";

const router=express.Router();


// router.get("/authentication", verifyToken,(req,res,next)=>{
//     res.send("hello you are authenticated")
// })

// router.get("/authentication/user/:id", verifyUser,(req,res,next)=>{
//     res.send("hello User you are authenticated,you can delete you account")
// })

// router.get("/authentication/admin/:id", verifyAdmin,(req,res,next)=>{
//     res.send("hello Admin you are authenticated, you can delete anyones account")
// })

// Create
//router.post("/", createUser);

//Update
router.put("/:id",verifyUser, updateUser)

//Delete
router.delete("/:id",verifyUser, deleteUser)

//Get count
router.get("/count", getUserCount);

//Get
router.get("/:id",verifyUser,getUser)

//Get All
router.get("/", getAll);


export default router