import db from "../models/index";

let createNewProduct = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Products.create({
        id: data.id,
        name: data.name,
        description: data.description,
        image: data.image.toString(),
        type: data.type,
        material: data.material,
        count: data.count,
        price: data.price,
        category: data.category,
      });
      resolve("Creat done");
    } catch (e) {
      reject(e);
    }
  });
};

let getAllProducts = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // console.log('page ', page);
      var products = await db.Products.findAll({
        raw: true,
      });
      resolve(products);
    } catch (e) {
      reject(e);
    }
  });
};

let findById = (idpd) => {
  return new Promise(async (resolve, reject) => {
    try {
      var item = await db.Products.findOne({
        where: { id: idpd },
      });
      resolve(item);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllId = () => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Products.findAll({
        attributes: ["id"],
      }).then((data) => {
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const deleteProduct = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Products.destroy({ where: { id: id } }).then((rowDeleted) => {
        if (rowDeleted === 1) {
          resolve(true);
        } else resolve(false);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateProduct = (product) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log('Updating product ', product);
      await db.Products.update(
        {
          name: product.name,
          price: product.price,
          count: product.count,
          type: product.type,
          description: product.description,
          material: product.material,
          image: product.image.toString(),
          category: product.category
        },
        {
          where: { id: product.id },
        }
      ).then(() => {
        db.Products.findOne({ where: { id: product.id } }).then((product) => {
          resolve(product);
        });
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewProduct,
  getAllProducts,
  findById,
  getAllId,
  deleteProduct,
  updateProduct,
};
