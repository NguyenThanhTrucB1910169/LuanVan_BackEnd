import db from "../models/index";

let createReview = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newReview = await db.Reviews.create({
        userId: data.userId,
        productId: data.productId,
        rating: data.rating,
        reviewText: data.reviewText,
        status: 1,
      });
      resolve(newReview);
    } catch (e) {
      reject(e);
    }
  });
};

let changeStatusReview = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Reviews.update({ status: status }, { where: { id: id } }).then(
        (result) => {
          console.log(result);
          resolve(result);
        }
      );
    } catch (error) {
      reject(error);
    }
  });
};

let getReviewByProductId = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log(data.image.toString());
      await db.Reviews.findAll({
        where: { productId: id },
        include: [
          {
            model: db.Users,
            attributes: ["id", "avatar", "fullname", "username"],
          },
        ],
      }).then((reviews) => {
        resolve(reviews);
      });
    } catch (e) {
      reject(e);
    }
  });
};

let getReviewByUserId = (id, page) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id);
      console.log(page);
      const pageSize = 10;
      const offset = (page - 1) * pageSize;
      console.log(offset);
      await db.Reviews.findAll({
        where: { userId: id },
        offset,
        limit: parseInt(pageSize),
        include: [
          {
            model: db.Products,
            attributes: ["id", "name", "image"],
          },
        ],
      }).then((reviews) => {
        if (reviews) {
          resolve(reviews);
        } else {
          resolve(null);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

let delReviewByUserId = (userid, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id);
      await db.Reviews.destroy({
        where: { id: id, userid: userid },
      }).then((delRow) => {
        resolve(delRow);
      });
    } catch (e) {
      reject(e);
    }
  });
};

const getTotalReviewsAndPages = (userId, pageSize) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalReviews = await db.Reviews.count({
        where: { userId },
      });
      console.log("totalReviews", totalReviews);
      const totalPages = Math.ceil(totalReviews / pageSize);
      resolve(totalPages);
    } catch (error) {
      reject(error);
    }
  });
};

const getTotalReviews = (pageSize) => {
  return new Promise(async (resolve, reject) => {
    try {
      const totalReviews = await db.Reviews.count();
      console.log("totalReviews", totalReviews);
      const totalPages = Math.ceil(totalReviews / pageSize);
      resolve(totalPages);
    } catch (error) {
      reject(error);
    }
  });
};

let updReviewByUser = (userId, id, review) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(review);
      const totalReviews = await db.Reviews.update(
        {
          reviewText: review.text,
          rating: review.rating,
        },
        {
          where: { userId: userId, id: id },
        }
      );
      console.log(totalReviews);
      const totalPages = Math.ceil(totalReviews / pageSize);
      resolve(totalPages);
    } catch (error) {
      reject(error);
    }
  });
};

let allReviews = (page) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(page);
      const pageSize = 10;
      const offset = (page - 1) * pageSize;
      console.log(offset);
      await db.Reviews.findAll({
        offset,
        limit: parseInt(pageSize),
        include: [
          {
            model: db.Products,
            attributes: ["id", "name", "image"],
          },
          {
            model: db.Users,
            attributes: ["id", "avatar", "fullname"],
          },
        ],
      }).then((reviews) => {
        if (reviews) {
          resolve(reviews);
        } else {
          resolve(null);
        }
      });
    } catch (e) {
      reject(e);
    }
  });
};

let delReviewById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(id);
      await db.Reviews.destroy({
        where: { id },
      }).then((delRow) => {
        resolve(delRow);
      });
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  createReview,
  getReviewByProductId,
  getReviewByUserId,
  changeStatusReview,
  delReviewByUserId,
  getTotalReviewsAndPages,
  updReviewByUser,
  allReviews,
  delReviewById,
  getTotalReviews,
};
