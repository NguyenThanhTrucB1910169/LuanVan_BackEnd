const express = require("express");
const products = require("../controllers/products.controller");
const cart = require("../controllers/cart.controller");
const users = require("../controllers/users.controller");
const order = require("../controllers/order.controller");
const payment = require("../controllers/payment.controller");
const review = require("../controllers/review.controller");
const router = express.Router();
const path = require("path");
const multer = require("multer");
const uploadPath = path.join(process.cwd(), "uploads");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const fs = require("fs");

function checkAvatarUpload(req, res, next) {
  const isAvatarUpload = req.body.isAvatar;
  const updateAddress = req.body.updateAddress;
  const updateAvatar = req.body.updateAvatar;
  console.log(typeof isAvatarUpload);
  console.log(typeof updateAddress);
  console.log(typeof updateAvatar);
  if (
    (isAvatarUpload === "true" &&
      updateAddress === "true" &&
      updateAvatar === "false") ||
    (isAvatarUpload === "true" &&
      updateAddress === "false" &&
      updateAvatar === "false")
  ) {
    console.log("vao update thông tin");
    return next();
  }

  next();
}

function checkUpdatedImage(req, res, next) {
  const isUpdateImage = req.body.isUpdateImage;
  if (isUpdateImage === "false") {
    console.log("not update");
    return next();
  }
  console.log("update");
  next();
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    console.log(req.body);
    const isAvatarUpload = req.body.isAvatar;
    console.log("isAvatarUpload ", typeof isAvatarUpload);
    if (isAvatarUpload === "true") {
      const userId = req.user.id;
      if (!userId) {
        return cb(new Error("ID người dùng không được tìm thấy."));
      }
      const originalFilename = file.originalname;
      console.log(originalFilename);
      const newFilename = `avatar_${userId}_${originalFilename}`;
      console.log(newFilename);
      const filePath = path.join(uploadPath, newFilename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return cb(null, newFilename);
    } else {
      const productId = req.body.id;
      console.log(productId);
      if (!productId) {
        return cb(new Error("Mã sản phẩm không được tìm thấy."));
      }
      // if (updateImage === false) {
      //   return next();
      // }
      const currentDate = new Date();
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1;
      const year = currentDate.getFullYear();
      const formattedDate = `${year}-${month}-${day}`;
      const originalFilename = file.originalname;
      console.log(originalFilename);
      console.log(formattedDate);
      const newFilename = `product_${productId}_${originalFilename}_${formattedDate}`;

      console.log("newFilename ", newFilename);
      const filePath = path.join(uploadPath, newFilename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      return cb(null, newFilename);
    }
  },
});

const upload = multer({ storage: storage });

// ROUTE OF PRODUCTS
router
  .route("/products")
  .get(products.getData)
  .post(upload.array("image", 3), products.sendData)
  .put(checkUpdatedImage, upload.array("image", 3), products.updateProduct);
router.route("/product/:id").get(products.getById);
router.route("/allidproducts").get(products.getAllIds);
router.route("/deleteproduct").delete(products.deleteProduct);

// ROUTE OF CART
router.route("/cart/:idpd/:qt").get(cart.addToCart);
router.route("/cartload").get(cart.getCart).put(cart.updateCartItem);
router.route("/deletecart").delete(cart.deleteCartItem);
router.route("/alldelete").delete(cart.deleteAllCart);

// ROUTE OF USER
router.route("/signup").post(users.createUser);
router.route("/login").post(users.authLogin);
router.route("/logout").get(users.logout);
router
  .route("/updateinfo")
  .put(
    isAuthenticatedUser,
    checkAvatarUpload,
    upload.single("avatar"),
    users.updateInfo
  );
router.route("/getallusers").get(users.getAllUsers);
router.route("/getById/:id").get(users.getByUserId);

// ROUTE OF ORDER
router.route("/order").post(isAuthenticatedUser, order.addOrder);
router.route("/orderByUser").get(order.getByUser);
router.route("/order/:id").get(isAuthenticatedUser, order.getDetailOrder);
router.route("/orderdeliver/").get(order.getOrderDeliver);
router
  .route("/allorders")
  .get(isAuthenticatedUser, authorizeRoles(1), order.getAllOrders);
router.route("/updatestatus").put(order.updateStatus);

// ROUTE OF REVIEWS
router.route("/reviews").post(isAuthenticatedUser, review.addNewReview);
router.route("/getReviews/byProduct/:id").get(review.getReviewByProduct);
router
  .route("/getReviewsByUser/:page")
  .get(isAuthenticatedUser, review.getReviewsByUser);
router
  .route("/delReviewByUser")
  .delete(isAuthenticatedUser, review.delReviewByUser);
router.route("/getTotalPage").get(isAuthenticatedUser, review.getTotalReviews);
router
  .route("/updatebyuser/review")
  .put(isAuthenticatedUser, review.updateReviewByUser);
router
  .route("/ad/allreviews/:page")
  .get(isAuthenticatedUser, authorizeRoles(1), review.getAllReviews);
router
  .route("/ad/delReview")
  .delete(isAuthenticatedUser, authorizeRoles(1), review.delReviewByAdmin);
router
  .route("/ad/getTotal")
  .get(isAuthenticatedUser, authorizeRoles(1), review.getTotalReviewForAd);

// ROUTE OF PAYMENT
router.route("/payment").post(isAuthenticatedUser, payment.handlePayment);
router
  .route("/stripeapikey")
  .get(isAuthenticatedUser, payment.sendStripeApiKey);
module.exports = router;
