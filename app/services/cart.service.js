const sql = require('../config/index')

const Cart = function (item) {
    this.userid = item.userid
    this.productid = item.productid
    this.quantity = item.quantity
    this.created = item.created
}

// Cart.create = (req, res) => {

// }

Cart.getByUserId = (id, result) => {
    var item = [];
    sql.db.sql.query("SELECT * FROM `products` INNER JOIN cart on products.idproduct = cart.productid WHERE cart.userid = ?", id, (err, res) => {
        if (err) {
            console.error(err);
            result(err, null);
            return;
        }
        result(null, {...res});
    });
}

module.exports = Cart;
