const jwt = require("jsonwebtoken");

//Creating token and saving in cookie
const sendToken = (user, statusCode, res) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + Number(process.env.COOKIE_EXPIRE) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

const getId = (token) => {
  const { id } = jwt.verify(token, process.env.JWT_SECRET);
  return id;
};

module.exports = { sendToken, getId };
