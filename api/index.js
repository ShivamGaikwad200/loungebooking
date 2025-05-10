import express from "express"
import mongoose from "mongoose"
//yarn add dotenv
import dotenv from "dotenv"
import authRoute from "./routes/auth.js"
// import hotelsRoute from "./routes/hotels.js"
// import roomsRoute from "./routes/rooms.js";
import loungesRoute from "./routes/lounges.js"
import bookingsRoute from "./routes/bookings.js"

import usersRoute from "./routes/users.js";
import cookieParser from "cookie-parser";
dotenv.config();
const app=express()
// 


const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,

        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};


mongoose.connection.on("disconnected",()=>{
    console.log("mongoDb is dissconnected");
})

mongoose.connection.on("connected",()=>{
    console.log("connected to mongoDb");
})


app.get("/",(req,res)=>{
    console.log("second response");
    res.send("second response");
})

//middleware

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth",authRoute);
app.use("/api/users",usersRoute);
// app.use("/api/hotels",hotelsRoute);
// app.use("/api/rooms",roomsRoute);
app.use("/api/lounges", loungesRoute);
app.use("/api/bookings", bookingsRoute);


app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message: message,
    });
});

//yarn start
app.listen(8800,()=>{
    connect();
    console.log("connected to backend")
})