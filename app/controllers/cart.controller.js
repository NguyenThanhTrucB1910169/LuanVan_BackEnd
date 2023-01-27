import * as cartService from "../services/cart.service";
import jwt from "jsonwebtoken";
require("dotenv").config();

exports.addToCart = async (req, res) => {
  try {
    // console.log(JSON.parse(req.params.iduser))
    console.log(1);
    console.log("red: " + req.params.idpd);
    jwt.verify(
      req.params.iduser,
      process.env.JWT_SECRET,
      async (err, verifiedJwt) => {
        if (err) {
          console.log(err.message);
        } else {
          //   console.log(verifiedJwt.id)
          await cartService.cartCreate(verifiedJwt.id);
          let cartid = await cartService.getCartId(verifiedJwt.id);
          // console.log(cartid.id)
          let data = {
            productId: req.params.idpd,
            cartId: cartid.id,
            quantity: req.params.qt,
          };
          await cartService.createCartItem(data).then(() => {
            console.log("send success");
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = async (req, res) => {
  try {
    jwt.verify(
      req.params.id,
      process.env.JWT_SECRET,
      async (err, verifiedJwt) => {
        if (err) {
          console.log(err);
        } else {
          await cartService.getCart(verifiedJwt.id).then((data) => {
            res.json(data);
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    // await cartService.updateCartItem(req.params.id, req.body).then((data) => {
    //   res.json(data);
    // })
    jwt.verify(
      req.params.id,
      process.env.JWT_SECRET,
      async (err, verifiedJwt) => {
        if (err) {
          console.log(err.message);
        } else {
          await cartService.updateCartItem(verifiedJwt.id, req.body).then((data) => {
            res.json(data);
          })
        }
      }
    )
  } catch (error) {
    console.log(error);
  }
};
