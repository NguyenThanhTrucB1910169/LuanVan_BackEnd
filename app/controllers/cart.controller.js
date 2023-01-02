const Cart = require("../services/cart.service");
const Product = require("../services/products.service");

exports.getById = async (req, res) => {
  Cart.getByUserId(req.params.id, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    else res.send(data);
  });
};
