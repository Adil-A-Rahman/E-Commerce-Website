const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken")
const sendEmail = require("../utils/sendEmail")
const crypto = require("crypto")
const cloudinary = require("cloudinary")

//Register the user
exports.registerUser = catchAsyncErrors(async (req, res, next)=>{

    myCloud = await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder: "avatars",
        width: 150,
        crop: 'scale'
    })

    const {name, email, password} = req.body;
    
    const user = await User.create({
        name, email, password,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url
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

//Admin: Get all users
exports.getAllUsers = catchAsyncErrors(async (req, res)=>{
    
    const userCount = await User.countDocuments();

    const user = await User.find();
    
    res.status(200).json({
        success: true,
        user,
        userCount
    });
});

//Admin: Get single User
exports.getSingleUser = catchAsyncErrors(async (req, res)=>{
    
    const user = await User.findById(req.params.id);
    
    if(!user){
        return next(new ErrorHander(`User does not exist with ID ${req.params.id}`, 400))
    }
    
    res.status(200).json({
        success: true,
        user
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

    const user = await User.findOne({
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

// Get user details
exports.getUserDetails = catchAsyncErrors(async(req, res, next)=>{
    
    const user = await User.findById(req.user.id);
    
    res.status(200).json({
        success: "true",
        user
    });
});

// Update user Password
exports.updatePassword = catchAsyncErrors(async(req, res, next)=>{
    
    const user = await User.findById(req.user.id).select("+password");
    
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);
    
    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander("Confirmed Password doesn't match ", 400))
    }

    if(!isPasswordMatched){
        return next(new ErrorHander("Old password is incorrect", 400))
    } 

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res); 
});

// Update User profile
exports.updateProfile = catchAsyncErrors(async(req, res, next)=>{
    
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    }
    
    // More to be written after hosting on Cloudinary


    const user = await User.findByIdAndUpdate(req.user.id, newUserData,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
    });
});

// Admin: Update user role
exports.updateUserRole = catchAsyncErrors(async(req, res, next)=>{
    
    const newUserRole = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    }
    
    const user = await User.findByIdAndUpdate(req.params.id, newUserRole,{
        new: true,
        runValidators: true,
        useFindAndModify: false
    });
    
    if(!user){
        return next(new ErrorHander(`User does not exist with ID ${req.params.id}`, 400))
    }

    res.status(200).json({
        success: true,
    });
});

// Admin: Delete User
exports.deleteUser = catchAsyncErrors(async(req, res, next)=>{
    
    const user = await User.findById(req.params.id);
    
    if(!user){
        return next(new ErrorHander(`User does not exist with ID ${req.params.id}`, 400))
    }

    // More to be written after hosting on Cloudinary (deleting user from cloudinary)


    await user.remove();

    res.status(200).json({
        success: true,
        message: "User deleted Successfully "
    });
});