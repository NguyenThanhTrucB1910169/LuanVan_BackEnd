import jwt from "jsonwebtoken";
require("dotenv").config()
const sendToken = (user, statusCode, res, usersend) => {
  const options = {
    expires: new Date(
      Date.now() + 1000*36000
    ),
    httpOnly: true,
  };
  const token = jwt.sign(user, process.env.JWT_SECRET);

    if(usersend !== null) {
      // options for cookie
      // console.log("JWT_COOKIE_EXPIRE " , process.env.JWT_COOKIE_EXPIRE)
      
      let id = user.id;
      // console.log(token);
      res.status(statusCode).cookie("token", token, options)
      .json({
        isAuth: true,
        key: id,
        user: usersend
      });
    } else {
      res.status(statusCode).cookie("token", token, options)
      .json({
        isAdmin: true,
        role: user.role
      });
    }
  };
  
  module.exports = sendToken