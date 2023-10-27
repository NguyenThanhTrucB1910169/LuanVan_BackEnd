const ApiError = require("../api-error");
const jwt = require("jsonwebtoken");
import * as userService from "../services/users.service";

exports.isAuthenticatedUser = async (req, res, next) => {
    try {
      // console.log(req)
      const { token } = req.cookies;
      // console.log(req.cookies)
      // console.log(token);
      if (!token) {
        throw new Error("Please Login to access");
      }
      const decodedData = jwt.verify(token, process.env.JWT_SECRET);
      req.user =  await userService.getUserById(decodedData.id);
      next();
    } catch (error) {
      return next(new ApiError(error.message, 401));
    }
  };
  

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
};
