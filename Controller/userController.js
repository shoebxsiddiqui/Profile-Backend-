const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../Middleware/catchAsyncErrors");
const User = require("../Models/userModel");
const sendToken = require("../utils/jwtToken");

let idMap = "Logged out";
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
  idMap = user._id;
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
  idMap = user._id;
  sendToken(user, 200, res);
});

//Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
  idMap = "Logged out";
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Get User Deatils
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  if (idMap === "Logged out") return next();
  const user = await User.findById(idMap);

  res.status(200).json({
    success: true,
    user,
  });
});
