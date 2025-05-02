import User from "../models/User.js"
import bcrypt from "bcryptjs";
import {createError} from "../utils/error.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

export const register=async (req,res,next)=>{
    try{
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser=new User({
            ...req.body,
            password:hash,
        })
        
        await newUser.save()
        res.status(200).send("user has ben created")

    }
    catch(error){
        next(error)
    }
};

export const login=async (req,res,next)=>{
    dotenv.config(); //very important
    try{
        const user=await User.findOne({username:req.body.username})
        if(!user) return next(createError(404,"User not found!"))
        
        const isPasswordCorrect =await bcrypt.compare(req.body.password, user.password)
        if(!isPasswordCorrect){
            return next(createError(404,'Incorrect Password or Username'))
            
        }
        const  token =jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT_S);

        const {password,isAdmin, ...otherDetails}=user._doc;
        res
            .cookie("access_token",token,{
                httpsOnly:true,
            })
            .status(200).json({details:{...otherDetails},isAdmin});

    }
    catch(error){
        next(error)
    }
};