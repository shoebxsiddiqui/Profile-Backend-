const express = require("express");
const cookieParser = require("cookie-parser");
const errorMiddleware = require("./Middleware/error");
const dotenv = require("dotenv");
const app = express();
const cors = require("cors");

// config
dotenv.config();

app.use(express.json());
app.use(cookieParser());

app.use(
  "*",
  cors({
    origin: true,
    credentials: true,
  })
);

// Route Imports
// const product = require("./routes/productRoute");
const user = require("./Routes/userRoute");
const product = require("./Routes/productRoute");

app.use("/api/v1", user);
app.use("/api/v1", product);

//Middleware for Error
app.use(errorMiddleware);

module.exports = app;
