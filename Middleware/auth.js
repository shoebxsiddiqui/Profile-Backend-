const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  console.log(req);
  let token = "";
  if (req.cookies.token) {
    token = Object.values(req.cookies.token).join("");
  } else {
    next();
  }
  if (!token) {
    return next(new ErrorHandler("Please Login to access this resource", 401));
  }
  try {
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedData.id);
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
  }
  next();
});
