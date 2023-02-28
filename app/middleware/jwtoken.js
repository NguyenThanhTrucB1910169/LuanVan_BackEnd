import jwt from "jsonwebtoken";
require("dotenv").config()
const sendToken = (user, statusCode, res, usersend) => {
    const token = jwt.sign(user, process.env.JWT_SECRET);
    // options for cookie
    // console.log("JWT_COOKIE_EXPIRE " , process.env.JWT_COOKIE_EXPIRE)
    const options = {
      expires: new Date(
        Date.now() + 1000*36000
      ),
      httpOnly: true,
    };
    let id = user.id;
    // console.log(token);
    res.status(statusCode).cookie("token", token, options)
    .json({
      success: true,
      key: id,
      user: usersend
    });
  };
  
  module.exports = sendToken