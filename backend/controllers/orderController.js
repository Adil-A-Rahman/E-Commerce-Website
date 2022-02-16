const Order = require("../models/orderModel");
const Product = require("../models/productModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

exports.newOrder = catchAsyncErrors(async (req, res, next)=>{

    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice
    } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id
    });

    res.status(201).json({
        success: true,
        order
    });
});

// Get a single order detail
exports.getSingleOrder = catchAsyncErrors(async (req, res, next)=>{

    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order){
        return next(new ErrorHander("Order not found", 404));
    }

    res.status(200).json({
        success:true,
        order
    });
});

// Get logged-in user's order detail
exports.myOrders = catchAsyncErrors(async (req, res, next)=>{

    const orders = await Order.find({user: req.user._id});

    res.status(200).json({
        success:true,
        orders
    });
});

// Admin: Get all order 
exports.getAllOrders = catchAsyncErrors(async (req, res, next)=>{

    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(order=>{
        totalAmount += order.totalPrice;
    });

    res.status(200).json({
        success:true,
        orders,
        totalAmount
    });
});

// Update stocks function (used in order update controller)
async function updateStock(id, quantity){
    
    const product = await Product.findById(id);

    product.stock -= quantity;

    await product.save({validateBeforeSave: false});
} 

// Admin: Update order status 
exports.updateOrder = catchAsyncErrors(async (req, res, next)=>{

    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this Id", 404));
      }

    if(order.orderStatus === "Delivered"){
        return next(new ErrorHander("You have already delivered this order", 400))
    }

    order.orderItems.forEach( async (ord)=>{
        await updateStock(ord.product, ord.quantity);
    })

    order.orderStatus = req.body.status;

    if (req.body.status === "Delivered"){
        order.deliveredAt = Date.now();
    }

    await order.save({validateBeforeSave: false});

    res.status(200).json({
        success:true
    });
});

// Admin: Delete order 
exports.deleteOrder = catchAsyncErrors(async (req, res, next)=>{

    const order = await Order.findById(req.params.id);

    if (!order){
        return next(new ErrorHander("Order not found", 404));
    }

    await order.remove();

    res.status(200).json({
        success:true
    });
});