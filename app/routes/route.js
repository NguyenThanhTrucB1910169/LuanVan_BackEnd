const express = require("express");
// const multer = require("multer");
const products = require("../controllers/products.controller");
const cart = require("../controllers/cart.controller");
const users = require("../controllers/users.controller");
const payment = require("../controllers/payment.controller");
// const upload = multer({storage: multer.memoryStorage()});

const router = express.Router();

router.route("/products").get(products.getData).post(products.sendData);
//     .delete(products.delete);
// router.route("/cartload/:user")
// .get(cart.getDetailCart)
router.route("/cart/:idpd/:qt").get(cart.addToCart);
router.route("/signup").post(users.createUser);
//     .get(users.getAllUsers);
router.route("/signup/auth").post(users.authLogin);
router.route("/payment").post(payment.handlePayment);
router.route("/payment/status/:client_secret").get(payment.retrieve);
router.route("/payment/confirm/:client_secret").get(payment.confirmPayment);
router.route("/product/:id").get(products.getById);
router.route("/logout").get(users.logout);
router.route("/cartload")
.get(cart.getCart)
.put(cart.updateCartItem);
router.route("/updateinfo").put(users.updateInfo);
// router.route("/cartload/amout").put(cart.updateCartItem);

module.exports = router;
