const express = require("express");
const products = require("../controllers/products.controller");
const cart = require("../controllers/cart.controller");
const users = require("../controllers/users.controller");

const router = express.Router();

router
  .route("/")
  .get(products.getAll)
  .post(products.create)
  .delete(products.delete);
router.route("/cart/:id")
    .get(cart.getById);
router.route("/signup")
    .post(users.create)
router.route("/:id")
    .put(products.update);

module.exports = router;
