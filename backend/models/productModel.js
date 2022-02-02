const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,"pls enter product name"],
        trim: true
    },
    description:{
        type: String,
        required: [true,"pls enter product desc"]
    },
    price:{
        type: Number,
        required: [true,"pls enter price"],
        maxLength: [8,"price cannot be more than 8 digits"]
    },
    ratings:{
        type: Number,
        default: 0
    },
    images:[
        {
            public_id:{
                type: String,
                required: true
            },
            url:{
                type: String,
                required: true
            }
        }
    ],
    category:{
        type: String,
        required: [true,"pls enter category"]
    },
    stock:{
        type: Number,
        required:[true,"pls enter stock"],
        maxLength: [4, "stock cannot exceed 4 digits"],
        default: 1
    },
    numOfReviews:{
        type: Number,
        default: 0
    },
    reviews:[
        {
            name:{
                type: String,
                required: true
            },
            rating:{
                type: Number,
                required: true
            },
            comment:{
                type: String,
                required: true
            }
        }
    ],
    user:{
        type: mongoose.Schema.ObjectId,
        ref:"User",
        required: true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Product", productSchema)