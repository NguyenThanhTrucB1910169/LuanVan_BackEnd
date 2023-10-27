import * as reviewService from '../services/reviews.service'
require("dotenv").config();
import jwt from "jsonwebtoken";

exports.addNewReview = async (req, res) => {
  try {
    console.log("review ", req.body)
    console.log('user ', req.user)
    const user = req.user;
    const content = {
      userId: user.id,
      productId: req.body.productId,
      rating: req.body.rating,
      reviewText: req.body.reviewText
    }
    let data = await reviewService.createReview(content);
    res.status(200).json(data);
} catch (error) {
    res.status(500).json(error);
  }
};

exports.getReviewByProduct = async (req, res) => {
  try {
    let id = req.params.id;
    let data = await reviewService.getReviewByProductId(id);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.getReviewsByUser = async (req, res) => {
  try{
    const userId = req.user.id;
    await  reviewService.getReviewByUserId(userId).then((data) =>{
      console.log(data)
       res.status(200).json(data);
    })
    .catch(() =>{
    res.status(500).json(error);

    })
  } catch(error) {
    res.status(500).json(error);
  }
}