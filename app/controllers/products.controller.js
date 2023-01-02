const Products = require('../services/products.service');
// const MongoDB = require('../utils/mongodb.util');
// const ApiError = require('../api-error');


exports.create = async(req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // Create a Tutorial
    const product = new Products({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      type: req.body.type,
      count: req.body.count,
    });
  
    // Save Tutorial in the database
    Products.create(product, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while creating the Tutorial."
        });
      else res.send(data);
    });
  };

exports.getAll = async (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      Products.getAllProducts((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while creating the Tutorial."
            });
        else
            res.send(data);
    })

}

exports.delete = async (req, res, next) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
      await Products.deleteAllProducts((err, data) => {
    if (err)
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Tutorial."
    });
  else res.send("Deleted successfully");
  })

}

exports.update = (req, res) => {
    // Validate Request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
    }
  
    // console.log(req.body);
  
    Products.updateById(
      req.params.id,
      new Products(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Tutorial with id ${req.params.id}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Tutorial with id " + req.params.id
            });
          }
        } else res.send(data);
      }
    );
  };
  

// exports.findAll = async (req, res, next) => {
//     let documents = [];
    
//     try{
//         const productService = new ProductsService(MongoDB.client);
//         const {name} = req.query;
//         if(name){
//             documents = await productService.findByName(name);
//         }else {
//             documents = await productService.find({});
//         }
//     }catch (error){
//         return next(
//             new ApiError(500, "An error occurred while retrieving products")
//         );
//     }
//         return res.send(documents);
// };

// exports.sorting = async (req, res, next) => {
//     try{
//         const productService = new ProductsService(MongoDB.client);       
//         documents = await productService.sortByPrice();
//         return res.send(documents); 
//     } catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while retrieving products")
//         );
//     }
       
// }

// exports.findOne = async (req, res, next) => {
//     try{
//         const productService = new ProductsService(MongoDB.client);
//         const document = await productService.findById(req.params.id);
//         if(!document){
//             return next(new ApiError(404, "Products not found"));
//         }
//         return res.send(document)
//     } catch(error){
//         return next(
//             new ApiError(
//                 500,
//                 `Error retrieving product with id=${req.params.id}`
//             )
//         );
//     }
// };

// exports.update = async (req, res, next) => {
//     if(Object.keys(req.body).length === 0){
//         return next(new ApiError(404, "Data to update can not be empty"));
//     }

//     try {
//         const productService = new ProductsService(MongoDB.client);
//         const document = await productService.update(req.params.id, req.body);
//         if(!document){
//             return next(new ApiError(404, "product not found"));
//         }
//         return res.send({ message: "product was updated successfully"});
//     }catch(error) {
//         return next(
//             new ApiError(500, `Error updating product with id=${req.params.id}`)
//         );
//     }
// }

// exports.delete = async (req, res, next) => {
//     try {
//         const productService = new ProductsService(MongoDB.client);
//         const document = await productService.delete(req.params.id);
//         if(!document){
//             return next(new ApiError(404, "Product not found"));
//         }
//         return res.send({ message: "Product was deleted successfully"});
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500,
//                 `Could not delete product with id=${req.params.id}`
//             )
//         );
//     }
// };

// exports.deleteAll = async (req, res, next) => {
//     try {
//         const productService = new ProductsService(MongoDB.client);
//         const deletedCount = await productService.deleteAll();
//         return res.send({
//             message: `${deletedCount} products were deleted successfully`,
//         });
//     }catch (error) {
//         return next(
//             new ApiError(500, "An error occurred while removing all products")
//         );
//     }
// };

// exports.findAllFavorite = async (_req, res, next) => {
//     try {
//         const productService = new ProductsService(MongoDB.client);
//         const documents = await productService.findFavorite();
//         return res.send(documents)
//     } catch (error) {
//         return next(
//             new ApiError(
//                 500,
//                 "An error occurred while retrieving favorite products"
//             )
//         );
//     }
// };



