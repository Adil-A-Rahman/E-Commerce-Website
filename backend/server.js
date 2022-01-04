const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database")

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