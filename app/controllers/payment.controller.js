import jwt from "jsonwebtoken";
require("dotenv").config();
import * as userService from "../services/users.service";
import ApiError from "../api-error";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const isAuthentication = (req, res) => {
  const token = req.cookies.token;
  let decodedData = null;
  if (!token) {
    console.log("please login");
    return decodedData;
  }
  decodedData = jwt.verify(token, process.env.JWT_SECRET);
  return decodedData;
  // req.user = await User.findById(decodedData.id);
};

// exports.handlePayment = async(req, res) => {
//   let isauth = isAuthentication(req, res);
//   if(isauth === null){
//     return (new ApiError("Please Login to access this resource", 401))
//   }
//   // res.send(isauth)
//   const myPayment = await stripe.paymentIntents.create({
//     amount: req.body.amount,
//     currency: "usd",
//     // statement_descriptor: isauth.username,
//     metadata: {
//       company: "S&S",
//     },
//   });
//   console.log(myPayment)
//   res
//     .status(200)
//     .json({ success: true, client_secret: myPayment.client_secret });
// }

exports.handlePayment = async (req, res, next) => {
  try {
    console.log(req.cookies);
    console.log(req.body);
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      metadata: {
        company: "SLux",
      },
    });
    console.log(myPayment);
    res
      .status(200)
      .json({ success: true, client_secret: myPayment.client_secret});
  } catch (error) {
    return next(new ApiError(error.message, 401));
  }
};

exports.sendStripeApiKey = async (req, res, next) => {
  try {
    res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
  } catch (error) {
    return next(new ApiError(error.message, 401));
  }
};

// exports.confirmPayment = (req, res) => {
//   // isAuthentication(req, res);
//   try {
//     const paymentConfirm =  stripe.paymentIntents.confirmCardPayment(
//       req.params.client_secret,
//       { payment_method: "pm_card_visa" }
//     );
//     console.log(paymentConfirm);
//     res.status(200).send(paymentConfirm.status);
//   } catch (err) {
//     return res.status(500).send(err);
//   }
// }

// exports.retrieve = async(req, res) => {
//   console.log('retrieve')
//   try {
//     console.log(req.params.client_secret)
//     const paymentIntent = await stripe.handleCardPayment(req.params.client_secret);
//     // console.log(paymentIntent.status);
//     console.log('paymentIntent')
//     console.log(paymentIntent)
//     res.send('success')
//   // if (paymentIntent && paymentIntent.status === 'succeeded') {
//   //   // Handle successful payment here
//   // } else {
//   //   // Handle unsuccessful, processing, or canceled payments and API errors here
//   // }
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// }
