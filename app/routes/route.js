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
const {  isAuthenticatedUser } = require("../middleware/auth");
const fs = require('fs');
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const productId = req.body.id; // Lấy mã sản phẩm từ yêu cầu (đảm bảo rằng bạn đã gửi mã sản phẩm cùng với yêu cầu)
    // const image = req.body.image; // Lấy mã sản phẩm từ yêu cầu (đảm bảo rằng bạn đã gửi mã sản phẩm cùng với yêu cầu)
    // console.log(image)
    if (!productId) {
      return cb(new Error('Mã sản phẩm không được tìm thấy.'));
    }
    const originalFilename = file.originalname;
    console.log(originalFilename)
    const newFilename = `product_${productId}_${originalFilename}`;
    console.log(newFilename)
    const filePath = path.join(uploadPath, newFilename);
    console.log(filePath)
    // Kiểm tra xem tệp ảnh cũ đã tồn tại
    if (fs.existsSync(filePath)) {
      // Nếu tệp ảnh cũ tồn tại, hãy xóa nó trước khi ghi đè
      fs.unlinkSync(filePath);
    }
    
    cb(null, newFilename);
  }
});
const upload = multer({ storage: storage });

// ROUTE OF PRODUCTS
router
  .route("/products")
  .get(products.getData)
  .post(upload.array("image", 3), products.sendData)
  .put(upload.array("image", 3),products.updateProduct);
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
router.route("/updateinfo").put(users.updateInfo);
router.route("/getallusers").get(users.getAllUsers);
router.route('/getById/:id').get(users.getByUserId);

// ROUTE OF ORDER
router.route("/order").post(order.addOrder)
router.route("/orderByUser").get(order.getByUser);
router.route("/order/:id").get(order.getDetailOrder);
router.route("/orderdeliver/").get(order.getOrderDeliver);
router.route("/allorders").get(order.getAllOrders);
router.route("/updatestatus").put(order.updateStatus);

// ROUTE OF REVIEWS
router.route("/reviews").post(isAuthenticatedUser, review.addNewReview)
router.route("/getReviews/byProduct/:id").get(review.getReviewByProduct)


// ROUTE OF PAYMENT
router.route("/payment").post(isAuthenticatedUser, payment.handlePayment);
router.route("/stripeapikey").get(isAuthenticatedUser, payment.sendStripeApiKey);
module.exports = router;
