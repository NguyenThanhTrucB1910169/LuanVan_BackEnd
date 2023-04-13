const express = require("express");
const products = require("../controllers/products.controller");
const cart = require("../controllers/cart.controller");
const users = require("../controllers/users.controller");
const order = require("../controllers/order.controller");

const router = express.Router();

router
  .route("/products")
  .get(products.getData)
  .post(products.sendData)
  .put(products.updateProduct);
router.route("/cart/:idpd/:qt").get(cart.addToCart);
router.route("/signup").post(users.createUser);
router.route("/signup/auth").post(users.authLogin);
router.route("/product/:id").get(products.getById);
router.route("/allidproducts").get(products.getAllIds);
router.route("/deleteproduct").delete(products.deleteProduct);
router.route("/logout").get(users.logout);
router.route("/cartload").get(cart.getCart).put(cart.updateCartItem);
router.route("/deletecart").delete(cart.deleteCartItem);
router.route("/alldelete").delete(cart.deleteAllCart);
router.route("/updateinfo").put(users.updateInfo);
router.route("/getallusers").get(users.getAllUsers);
router.route("/order").post(order.addOrder).get(order.getByUser);
router.route("/order/:id").get(order.getDetailOrder);
router.route("/allorders").get(order.getAllOrders);
module.exports = router;
