const ErrorHandler = require("../utils/errorhander");

module.exports = (err,req,res,next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";
    
    //MongoDB ID Cast error
    if(err.name === "CastError"){
        const message = "Resource Not Found. Invalid:" + err.path; 
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate key error
    if(err.code === 11000){
        const message = "Duplicate " + Object.keys(err.keyValue) + " Entered";
        err = new ErrorHandler(message, 400);
    }

    //wrong JWT web token 
    if(err.name === "JsonWebTokenError"){
        const message = "Json Web Token is invalid, try again"; 
        err = new ErrorHandler(message, 400);
    }

    //JWT expired error
    if(err.name === "TokenExpiredError"){
        const message = "Json Web Token has expird, try again"; 
        err = new ErrorHandler(message, 404);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
}

