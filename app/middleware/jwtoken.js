import jwt from "jsonwebtoken";
require("dotenv").config()
const sendToken = (user, statusCode, res) => {
    const token = jwt.sign(user, process.env.JWT_SECRET);
    // options for cookie
    // console.log("JWT_COOKIE_EXPIRE " , process.env.JWT_COOKIE_EXPIRE)
    const options = {
      expires: new Date(
        Date.now() + 1000*36000
      ),
      httpOnly: true,
    };
    res.status(statusCode).cookie("token", token, options)
    .json({
      success: true,
      token,
      user,
    });
  };
  
  module.exports = sendToken