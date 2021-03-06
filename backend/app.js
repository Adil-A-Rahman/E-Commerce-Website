const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv");
const errorMiddleware = require("./middleware/error");

//config import
dotenv.config({path: "backend/config/config.env"})

app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(fileUpload())

//Routes import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

//Use product routes
app.use("/api/v1", product);

//Use user routes
app.use("/api/v1", user);

//User order route
app.use("/api/v1", order)

//Payment route
app.use("/api/v1", payment)

//Middleware for error
app.use(errorMiddleware);

module.exports = app;