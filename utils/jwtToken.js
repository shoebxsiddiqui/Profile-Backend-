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
    path: "/",
    domain: "bwxw.onrender.com",
  };

  res.status(statusCode).cookie("token", token).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
