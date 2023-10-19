import * as cartService from "../services/cart.service";
import jwt from "jsonwebtoken";
require("dotenv").config();

exports.addToCart = async (req, res) => {
  try {
    // await cartService.cartCreate(verifiedJwt.id);
    // let cartid = await cartService.getCartId(verifiedJwt.id);
    // let data = {
    //   productId: req.params.idpd,
    //   cartId: cartid.id,
    //   quantity: req.params.qt,
    // };
    // await cartService.createCartItem(data).then((val) => {
    //   res.json(val);
    // });

    
    console.log(req)
    const token = req.cookies.token;
    console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
      if (err) {
        console.log(err.message);
      } else {
        await cartService.cartCreate(verifiedJwt.id);
        let cartid = await cartService.getCartId(verifiedJwt.id);
        console.log(cartid);
        let data = {
          productId: req.params.idpd,
          cartId: cartid.id,
          quantity: req.params.qt,
        };
        await cartService.createCartItem(data).then((val) => {
          res.json(val);
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getCart = async (req, res) => {
  try {
    let token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
      if (err) {
        console.log(err);
      } else {
        await cartService.getCart(verifiedJwt.id).then((data) => {
          res.json(data);
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateCartItem = async (req, res) => {
  try {
    if (req.body) {
      let token = req.cookies.token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if (err) {
          console.log(err.message);
        } else {
          await cartService
            .updateCartItem(verifiedJwt.id, req.body)
            .then((data) => {
              res.json(data);
            });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCartItem = async (req, res) => {
  let token = req.cookies.token;
  try {
    if (req.body) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if (err) {
          console.log(err.message);
        } else {
          await cartService
            .deleteCartItem(verifiedJwt.id, req.body.id)
            .then((data) => {
              res.json(data);
            });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.deleteAllCart = async (req, res) => {
  try {
    let token = req.cookies.token;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if (err) {
          console.log(err.message);
        } else {
          await cartService.deleteAllCart(verifiedJwt.id).then((rs) => {
            console.log(rs)
            res.json('kết quả từ delete all cart');
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
