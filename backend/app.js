const express = require("express");
const app = express();

const errorMiddleware = require("./middleware/error");

app.use(express.json())

//Routes import
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");

//Use product routes
app.use("/api/v1",product);
//Use user routes
app.use("/api/v1",user);

//Middleware for error
app.use(errorMiddleware);


module.exports = app;