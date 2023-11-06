import * as reviewService from "../services/reviews.service";
require("dotenv").config();

exports.addNewReview = async (req, res) => {
  try {
    console.log("ADD NEW REVIEW");
    const user = req.user;
    const content = {
      userId: user.id,
      productId: req.body.productId,
      rating: req.body.rating,
      reviewText: req.body.reviewText,
    };
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
};

exports.getReviewsByUser = async (req, res) => {
  try {
    console.log("GET REVIEWS BY USER");
    const userId = req.user.id;
    let page = req.params.page;
    await reviewService.getReviewByUserId(userId, page).then((reviews) => {
      if (reviews) {
        res.status(200).json(reviews);
      } else {
        res.status(404).json(err);
      }
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTotalReviews = async (req, res) => {
  try {
    const userId = req.user.id;
    const pageSize = 10;
    await reviewService
      .getTotalReviewsAndPages(userId, pageSize)
      .then((totalPages) => {
        if (typeof totalPages === "number") {
          res.status(200).json({ totalPages });
        } else {
          res.status(404).json({ error: "Không tìm thấy tổng số trang." });
        }
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getTotalReviewForAd = async (req, res) => {
  try {
    const pageSize = 20;
    await reviewService
      .getTotalReviews(pageSize)
      .then((totalPages) => {
        if (typeof totalPages === "number") {
          res.status(200).json({ totalPages });
        } else {
          res.status(404).json({ error: "not found" });
        }
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.delReviewByUser = async (req, res) => {
  try {
    console.log("DEL REVIEW BY USER ");
    await reviewService
      .delReviewByUserId(req.user.id, req.body.reviewId)
      .then((data) => {
        if (data === 0) {
          res.status(404).json({ message: "not found" });
        } else {
          res.status(200).json({ message: true });
        }
      })
      .catch(() => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateReviewByUser = async (req, res) => {
  try {
    console.log("UPDATE REVIEW BY USER ");
    console.log("req.body.review ", req.body);
    await reviewService
      .updReviewByUser(req.user.id, req.body.reviewId, req.body.review)
      .then((data) => {
        if (data === 0) {
          res.status(404).json({ message: "not found" });
        } else {
          res.status(200).json({ message: true });
        }
      })
      .catch(() => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    console.log("GET ALL REVIEWS BY AD ");
    let page = req.params.page;
    await reviewService
      .allReviews(page)
      .then((data) => {
        if (data) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ message: "not found" });
        }
      })
      .catch(() => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};


exports.delReviewByAdmin = async (req, res) => {
  try {
    console.log("DELETE REVIEW BY ADMIN ");
    console.log("req.body.reviewId ", req.body.reviewId);
    await reviewService
      .delReviewById(req.body.reviewId)
      .then((data) => {
        if (data === 0) {
          res.status(404).json({ message: "not found" });
        } else {
          res.status(200).json({ message: true });
        }
      })
      .catch(() => {
        res.status(500).json(error);
      });
  } catch (error) {
    res.status(500).json(error);
  }
};
