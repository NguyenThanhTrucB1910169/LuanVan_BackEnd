import * as orderService from "../services/order.service";
import jwt from "jsonwebtoken";
require("dotenv").config();

exports.addOrder = (req, res) => {
  try {
    if (req.body) {
      let token = req.cookies.token;

      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if (err) {
          console.log(err.message);
        } else {
          console.log(req.body);
          const order = await orderService.addOrder(
            verifiedJwt.id,
            req.body.total,
            req.body.status,
            req.body.note
          );

          const orderItemsPromises = await req.body.products.map(
            async (item) => {
              const data = {
                orderId: order.id,
                productId: item.id,
                quantity: item.quantity,
                price: item.price,
              };
              return orderService.addOrderItem(data);
            }
          );
          const orderItems = await Promise.all(orderItemsPromises);
          const done = orderItems.every((item) => item === true);
          res.json(done);
        }
      });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.getByUser = (req, res) => {
  try {
    let token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
      if (err) {
        res.status(400).send("not logged in");
      } else {
        await orderService
          .getByUser(verifiedJwt)
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            res.status(500).json(err);
          });
      }
    });
  } catch (error) {
    res.json(error);
  }
};

exports.getDetailOrder = (req, res) => {
  try {
    let id = req.params.id;
    let token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
      if (err) {
        res.status(400).send("not logged in");
      } else {
        await orderService
          .getDetailOrder({ id: id, user: verifiedJwt.id })
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            res.json(err);
          });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.getAllOrders = (req, res) => {
  try {
    let token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
      if (err) {
        res.status(400).send("not logged in");
      } else {
        await orderService.getAllOrders().then((dt) => {
          res.json(dt);
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateStatus = async (req, res) => {
  try {
    if (req.body.id) {
      let token = req.cookies.token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if (err) console.log(err);
        else if (verifiedJwt.role === "undefined" || verifiedJwt.role !== 1) {
          await orderService
            .updateStatus(req.body.id, req.body.status)
            .then(async (rs) => {
              if (rs[0] === 1) {
                orderService.getByUser(verifiedJwt).then((data) => {
                  res.status(200).json([0,...data]);
                });
              }
            });
        } else {
          await orderService
            .updateStatus(req.body.id, req.body.status)
            .then(async (rs) => {
              if (rs[0] === 1) {
                await orderService.getAllOrders().then((dt) => {
                  res.status(200).json([verifiedJwt.role, ...dt]);
                });
              }
            });
        }
      });
    }
  } catch (error) {
    res.json(error);
  }
};

exports.getOrderDeliver = async (req, res) => {
  try {
    let token = req.cookies.token;
    jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
      if (err) {
        console.log(err);
        res.status(400).send("not logged in");
      } else {
        await orderService.getOrderStatus(verifiedJwt.id, 1).then((dt) => {
          res.status(200).json(dt);
        })
      }
    })
  } catch (error) {
    res.json(error);
  }
}