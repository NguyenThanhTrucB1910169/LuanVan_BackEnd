import * as productServices from '../services/products.service'
require("dotenv").config();
import jwt from "jsonwebtoken";


exports.getData = async(req, res) => {
  try {
    let data = await productServices.getAllProducts();
    res.send(data);
  } catch (error) {
    console.log(error);
  }
}

exports.sendData = async(req, res) => {
  // console.log(req.body);
  try {
    await productServices.createNewProduct(req.body)
    res.send("create success");
  } catch (error) {
    console.log(error);
  }
}

exports.deleteProduct = async(req, res) => {
  try {
    if(req.body.id){
      let token = req.cookies.token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if(err) console.log(err);
        else if(verifiedJwt.role !== 1) res.send('No permission')
        else {
          await productServices.deleteProduct(req.body.id).then((rs) => {
            res.json(rs)
          })
        }
      })
    }
  } catch (error) {
    console.log(error);
  }
}

exports.getById = async(req, res) => {
  try {
    console.log(req.params.id)
    let item = await productServices.findById(req.params.id)
    // await productServices.getByCartItem().then((data) => {
    //   res.json(data);
    // })
    res.send(item);
  } catch (error) {
    console.log(error);
  }
}

exports.getAllIds = async(req, res) => {
  try {
    await productServices.getAllId().then((data) => {
      res.json(data);
    })
  } catch (error) {
    console.log(error);
  }
}

exports.updateProduct = async (req, res) => {
  try {
    if(req.body.id){
      let token = req.cookies.token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if(err) console.log(err);
        else if(verifiedJwt.role !== 1) res.send('No permission')
        else {
          await productServices.updateProduct(req.body).then((rs) => {
            res.json(rs)
          })
        }
      })
    }
  } catch (error) {
    console.log(error);
  }
}