const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const User = require("../Models/userModel");
const sendToken = require("../utils/jwtToken");

// Register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  let public_id = "jjj";
  let secure_url = "jjj";

  const { name, email, password, phone_no } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    phone_no,
    avatar: {
      public_id: public_id,
      url: secure_url,
    },
  });

  sendToken(user, 201, res);
});

//Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  //checking if user has given email and password both
  if (!email || !password) {
    return next(new ErrorHandler("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Enail or Password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Enail or Password", 401));
  }

  sendToken(user, 200, res);
});

//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    secure: true, // Set to true if using HTTPS/
    sameSite: "none", // Required if using cross-origin requests
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
