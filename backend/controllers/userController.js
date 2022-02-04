const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")


//Register the user
exports.registerUser = catchAsyncErrors(async (req, res, next)=>{
    
    const {name, email, password} = req.body;
    
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: "This is a sample id",
            url: "profilepicUrl"
        }
    });

    sendToken(user, 201, res);
});

//Login Users
exports.loginUser =  catchAsyncErrors(async (req, res, next)=>{

    const {email, password} = req.body;

    //Checking if the user has given the email and password both
    if (!email || !password){
        return next(new ErrorHander("Please Enter Email and Password", 400))
    }

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHander("Invalid Email or Password", 401))
    }

    const isPasswordMatched = await user.comparePassword(password);
    
    if(!isPasswordMatched){
        return next(new ErrorHander("Invalid Email or Password", 401))
    }

    sendToken(user, 200, res);
});

//Get all users (Admin)
exports.getAllUsers = catchAsyncErrors(async (req, res)=>{
    
    const userCount = await User.countDocuments();

    const user = await User.find();
    
    res.status(200).json({
        success: true,
        user,
        userCount,
    });
});

//logout user
exports.logout = catchAsyncErrors(async(req, res, next) =>{
    
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged out"
    });
});

// Forgot Password token
exports.forgotPassword = catchAsyncErrors(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email});
    
    if (!user){
        return next(new ErrorHander("User not found"), 404)
    }

    // Get token
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave:false});
    
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`

    const message = "Your password reset token is:\n\n" + resetPasswordUrl + "\n\nIf you haven't requested a password reset email then, please ignore it";
    
    try{
        await sendEmail({
            email:user.email,
            subject: "Ecom Website Password Reset Link",
            message
        });

        res.status(200).json({
            success: true,
            message: "Email sent to " + user.email + " successfully"
        })

    }catch(error){
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save({validateBeforeSave:false});

        return next(new ErrorHander(error.message, 500));
    }

});


// Reset password 
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {

    //Hashing URL
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await user.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt: Date.now()}
    })

    if(!user){
        return next(new ErrorHander("Reset Password token has expired or is invalid", 400))
    } 

    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander("Confirmed Password doesn't match ", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user,200, res);
});