const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [40, "Name cannot exceed 40 characters"],
        minLength: [3, "Name should have more than 3 characters "]
    },
    email:{
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid Email"]
    },
    password:{
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should have more than 8 characters "],
        select: false,
    },
    avatar:{
        public_id:{
            type: String,
            required: true
        },
        url:{
            type: String,
            required: true
        }
    },
    role:{
        type: String,
        default: "user"
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date, 
});

userSchema.pre("save", async function(next){

    if(!this.isModified("password")){
        next();
    };

    this.password = await bcrypt.hash(this.password, 10);
});

//JWT Token
userSchema.methods.getJWTToken =  function(){
    return jwt.sign({ id:this._id }, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRE
    });
};

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generating pwd reset token
userSchema.methods.getResetPasswordToken = function (){

    // Generating Token
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hashing and adding resetPasswordToken to userSchema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");

    this.resetPasswordExpire = Date.now() + 15*60*1000;

    return resetToken;
};



module.exports = mongoose.model("User", userSchema); 