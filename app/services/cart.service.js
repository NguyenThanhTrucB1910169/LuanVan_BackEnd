import db from "../models/index";
const sequelize = require("sequelize");

const cartCreate = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let findUser = await db.Carts.findAll({ where: { userId: userId } });
      if (findUser.length === 0) {
        await db.Carts.create({
          userId: userId,
        });
        resolve(true);
      }
      resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};

const getCartId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cartid = await db.Carts.findOne({
        where: { userId: userId },
        attributes: ["id"],
      });
      resolve(cartid);
    } catch (e) {
      reject(e);
    }
  });
};

const createCartItem = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let product = await db.CartItems.findOne({
        where: {
          productId: data.productId,
          cartId: data.cartId,
        },
      });
      if (product) {
        if (parseInt(data.quantity) === 1) {
          await db.CartItems.update(
            {
              quantity: product.quantity + 1,
            },
            { where: { cartId: product.cartId, productId: product.productId } }
          );
        } else {
          await db.CartItems.update(
            {
              quantity: data.quantity,
            },
            { where: { cartId: product.cartId, productId: product.productId } }
          );
        }
      } else {
        await db.CartItems.create({
          cartId: data.cartId,
          productId: data.productId,
          quantity: data.quantity,
        });
      }
      resolve("success");
    } catch (e) {
      reject(e);
    }
  });
};

const getCart = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      let data = await db.Carts.findAll({
        where: { userId: userId },
        attributes: [
          "Products.CartItems.productId",
          "userId",
          "Products.name",
          "Products.image",
          "Products.type",
          "Products.material",
          "Products.price",
          "Products.CartItems.cartId",
          "Products.CartItems.quantity",
        ],
        include: [
          { model: db.Products, attributes: [], through: { attributes: [] } },
        ],
        raw: true,
      });
      resolve(data);
    } catch (error) {
      console.log(error);
    }
  });
};

const updateCartItem = (userId, req) => {
  return new Promise(async (resolve, reject) => {
    console.log(req);
    try {
      await getCartId(userId).then(async (response) => {
        await db.CartItems.update(
          { quantity: req.qt },
          { where: { cartId: response.id, productId: req.pd } }
        ).then(() => {
          getCart(userId).then((data) => {
            resolve(data);
          });
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteCartItem = (user, id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await getCartId(user).then(async (response) => {
      console.log(response)
        await db.CartItems.destroy({
          where: { cartId: response.id, productId: id },
        }).then(() => {
          getCart(user).then((data) => {
            resolve(data);
          });
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteAllCart = (id) => {
  console.log(id);
  return new Promise(async (resolve, reject) => {
    try {
      await db.Carts.findOne({
        where: { userId: id },
        attributes: ["id"],
      }).then(async (data) => {
        await db.Carts.destroy({
          where: { userId: id },
        });
        await db.CartItems.destroy({ where: { cartId: data.id } });
        resolve(true);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  cartCreate,
  getCart,
  createCartItem,
  getCartId,
  updateCartItem,
  deleteCartItem,
  deleteAllCart,
};
