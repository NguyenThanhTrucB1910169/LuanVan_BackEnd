import * as productServices from "../services/products.service";
require("dotenv").config();
import jwt from "jsonwebtoken";

exports.getData = async (req, res) => {
  try {
    console.log("GET DATA")
    let data = await productServices.getAllProducts();
    // console.log(data);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
};

exports.sendData = async (req, res) => {
  try {
    const getFileName = [];
    // console.log(req.files)
    await req.files.forEach((file) => {
      getFileName.push(file.filename)
    });
    // console.log(getFileName)
    const data = {
      id: req.body.id,
      name: req.body.name,
      price: req.body.price,
      count: req.body.count,
      image: getFileName,
      description: req.body.description,
      type: req.body.type,
      material: req.body.material,
      category: req.body.category,
    };
    await productServices.createNewProduct(data);
    res.send("create success");
  } catch (error) {
    console.log(error);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    if (req.body.id) {
      let token = req.cookies.token;
      jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
        if (err) console.log(err);
        else if (verifiedJwt.role !== 1) res.send("No permission");
        else {
          await productServices.deleteProduct(req.body.id).then((rs) => {
            res.json(rs);
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
};

exports.getById = async (req, res) => {
  try {
    // console.log(req.params.id);
    let item = await productServices.findById(req.params.id);
    res.send(item);
  } catch (error) {
    console.log(error);
  }
};

exports.getAllIds = async (req, res) => {
  try {
    await productServices.getAllId().then((data) => {
      res.json(data);
    });
  } catch (error) {
    console.log(error);
  }
};

exports.updateProduct = async (req, res) => {
  // try {
  //   if (req.body.id) {
  //     let token = req.cookies.token;
  //     jwt.verify(token, process.env.JWT_SECRET, async (err, verifiedJwt) => {
  //       if (err) console.log(err);
  //       else if (verifiedJwt.role !== 1) res.send("No permission");
  //       else {
  //         await productServices.updateProduct(req.body).then((rs) => {
  //           res.json(rs);
  //         });
  //       }
  //     });
  //   }
  // } catch (error) {
  //   console.log(error);
  // }
  try {
    const updateImage = req.body.isUpdateImage;
    console.log('req.body ', req.body)
    var data = {};
    console.log('updateImage ', typeof updateImage)
    if(updateImage === 'true') {
      console.log('VAO UPDATE IS TRUE')
      const getFileName = [];
      // console.log(req.files)
      await req.files.forEach((file) => {
        // console.log()
        getFileName.push(file.filename)
      });
      console.log('getFileName ', getFileName)
      data = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        count: req.body.count,
        image: getFileName,
        description: req.body.description,
        type: req.body.type,
        material: req.body.material,
        category: req.body.category,
      };
    }
    else{
      console.log(req.body);
      data = {
        id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        count: req.body.count,
        image: req.body.image,
        description: req.body.description,
        type: req.body.type,
        material: req.body.material,
        category: req.body.category,
      };
    }
    console.log(data)
    await productServices.updateProduct(data).then((rs) => {
      console.log(rs)
      res.json(rs);
    });
    // res.send("create success");
  } catch (error) {
    console.log(error);
  }
};
