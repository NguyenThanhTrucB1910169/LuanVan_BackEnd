import * as productServices from '../services/products.service'

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