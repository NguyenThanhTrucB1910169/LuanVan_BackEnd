const express = require("express");
// const multer = require("multer");
const products = require("../controllers/products.controller");
const cart = require("../controllers/cart.controller");
const users = require("../controllers/users.controller");
// const upload = multer({storage: multer.memoryStorage()});

const router = express.Router();

router.route("/products")
    .get(products.getData)
    .post(products.sendData)
//     .delete(products.delete);
// router.route("/cartload/:user")
    // .get(cart.getDetailCart)
router.route("/cart/:iduser/:idpd/:qt")
    .get(cart.addToCart)
router.route("/signup")
    .post(users.createUser)
//     .get(users.getAllUsers);
router.route("/signup/auth")
    .post(users.authLogin)
// router.route("/upload")
//     .post(products.upload)
router.route("/product/:id")
    .get(products.getById);
router.route("/logout")
    .get(users.logout)
router.route("/cartload/:id")
    .get(cart.getCart)
router.route("/updateamount/:id")
    .put(cart.updateCartItem)

module.exports = router;
