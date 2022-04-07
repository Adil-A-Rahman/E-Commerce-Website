const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")
const cloudinary = require("cloudinary")

//Handling Uncaught Error
process.on("uncaughtException",(err)=>{
    console.log("Error:", err.message);
    console.log("Shutting down the server due to Uncaught Exception")
    
    process.exit(1);
});

//config import
dotenv.config({path: "backend/config/config.env"})

//Connect DB
connectDatabase();


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET 
})

//port listener
const server = app.listen(process.env.PORT,()=>{
    console.log("Server is running on port:", process.env.PORT)
});

//Unhandled Promise Rejection
process.on("unhandledRejection", (err)=>{
    console.log("Error:", err.message);
    console.log("Shutting down the server due to Unhandled Promise Rejection")

    server.close(()=>{
        process.exit(1);
    });
});