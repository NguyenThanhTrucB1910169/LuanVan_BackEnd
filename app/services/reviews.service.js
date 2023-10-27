import db from "../models/index";

let createReview = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newReview = await db.Reviews.create({
        userId: data.userId,
        productId: data.productId,
        rating: data.rating,
        reviewText: data.reviewText,
      });
      resolve(newReview);
    } catch (e) {
      reject(e);
    }
  });
};

let getReviewByProductId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(data.image.toString());
      await db.Reviews.findAll({
        where: { productId: id },
      }).then((reviews) => {
        resolve(reviews);
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getReviewByUserId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(data.image.toString());
      await db.Reviews.findAll({
        where: { userId: id },
      }).then((reviews) => {
        resolve(reviews);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createReview,
  getReviewByProductId,
  getReviewByUserId
};
