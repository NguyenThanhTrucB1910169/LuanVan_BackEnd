import * as cartService from "../services/cart.service";
import jwt from "jsonwebtoken";
require("dotenv").config();

exports.addToCart = async (req, res) => {
  try {
    // console.log(JSON.parse(req.params.iduser))
    // console.log(1);
    const token = req.cookies.token;
    // console.log(token);
    // console.log("red: " + req.params.idpd);
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
      if (err) {
        console.log(err.message);
      } else {
        // console.log(verifiedJwt.id)
        await cartService.cartCreate(verifiedJwt.id);
        // console.log(result);
        // console.log(verifiedJwt.id)
        let cartid = await cartService.getCartId(verifiedJwt.id);
        let data = {
          productId: req.params.idpd,
          cartId: cartid.id,
          quantity: req.params.qt,
        };
        console.log(data);
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
    // console.log(token);
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
  // console.log(req.body)
  try {
    if (req.body) {
      let token = req.cookies.token;
      // console.log(token)
      // console.log(req)
      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if (err) {
          console.log(err.message);
        } else {
          await cartService
            .updateCartItem(verifiedJwt.id, req.body)
            .then((data) => {
              // console.log(data);
              res.json(data);
            });
        }
      });
      // await cartService.updateCartItem(req.params.id, req.body).then((data) => {
      //   res.json(data);
      // })
    }
    // jwt.verify(
    //   req.params.id,
    //   process.env.JWT_SECRET,
    //   async (err, verifiedJwt) => {
    //     if (err) {
    //       console.log(err.message);
    //     } else {
    //       await cartService.updateCartItem(verifiedJwt.id, req.body).then((data) => {
    //         res.json(data);
    //       })
    //     }
    //   }
    // )
  } catch (error) {
    console.log(error);
  }
};
exports.deleteCartItem = async (req, res) => {
  let token = req.cookies.token;
  // console.log(token)
  // console.log(req.body)
  try {
    if (req.body) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if (err) {
          console.log(err.message);
        } else {
          await cartService
            .deleteCartItem(verifiedJwt.id, req.body.id)
            .then((data) => {
              // console.log(data);
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
    // console.log(token);
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if (err) {
          console.log(err.message);
        } else {
          // console.log(verifiedJwt.id)
          await cartService.deleteAllCart(verifiedJwt.id).then((rs) => {
            res.json(rs);
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};
