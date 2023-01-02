// // const {ObjectId} = require("mongodb");
const sql = require("../config/index")


    const Products = function (products) {
        this.name = products.name;
        this.description = products.description;
        this.type = products.type;
        this.price = products.price;
        this.image = products.image;
        this.count = products.count;
    }
    // static getDbServiceInstance() {
    //     return instance ? instance : new DbService();
    // }
    Products.create = (newProduct, result) => {
        sql.db.sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
            if (err) {
                console.error(err);
                result(err, null);
                return;
            }
            // console.log('create products', {id: res.insertId, ...newProduct})
            result(null, { id: res.insertId, ...newProduct });
            // res.send(result);
        });
    }

    Products.getAllProducts = (result) => {
        sql.db.sql.query("SELECT * FROM products", (err, res) => {
            if (err) {
                console.error(err);
                result(err, null);
                return;
            }
            // console.log('create products', {id: res.insertId, ...newProduct})
            result(null, res);
            // res.send(result);
        });
    }

    Products.getProductById = (id, result) => {
        sql.db.sql.query('SELECT * FROM products where ID = ?',[id], (err, res) => {
            if (err) {
                console.error(err);
                result(err, null);
                return;
            }
            console.log(id)
            result(null, res)
        })
    }

    Products.deleteAllProducts = (result) => {
        sql.db.sql.query("DELETE FROM products", (err, res) => {
            if (err) {
                console.error(err);
                result(err, null);
                return;
            }
            // console.log('create products', {id: res.insertId, ...newProduct})
            result(null, res);
            // res.send(result);
        });
    }
    Products.updateById = (id, product, result) => {
        sql.db.sql.query(
          "UPDATE products SET name = ?, description = ?, type = ?, price = ?, count = ?, image = ? WHERE id = ?",
          [product.name, product.description, product.type, product.price, product.count, product.image, id],
          (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            }
      
            if (res.affectedRows == 0) {
              // not found product with the id
              result({ kind: "not_found" }, null);
              return;
            }
      
            // console.log("updated product: ", { id: id, ...product });
            result(null, { id: id, ...product });
          }
        );
      };


// }


module.exports = Products;

// class ProductsService {
//     constructor(client) {
//         this.Products = client.db().collection("products");
//     }

//     extractProductData(payload) {
//         const product = {
//             name: payload.name,        
//             image: payload.image,
//             favorite: payload.favorite,
//             price: payload.price,
//             description: payload.description,
//         };

//         Object.keys(product).forEach(
//             (key) => product[key] === undefined && delete product[key]
//         );

//         return product;
//     }

//     async create(payload) {
//         const product = this.extractProductData(payload);
//         const result = await this.Products.findOneAndUpdate(
//             product,
//             { $set: product },
//             { returnDocument: "after", upsert: true }
//         );
//         return result.value;
//     }

//     async findById(id){
//         return await this.Products.findOne({
//             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//         });
//     }


//     async find(filter){
//         const cursor = await this.Products.find(filter);
//         return await cursor.toArray();
//     }
        
//     async findByName(name){
//         return await this.find({
//             name: {$regex: new RegExp(name), $options: "i"},
//         });
//     }

   
//     async sortByPrice(){
//         // const sort = await this.find({});
//         const sort = await this.Products.find({}).sort({"price":1})
//         return await sort.toArray();
//     }

//     async update(id, payload){
//         const filter = {
//             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//         };
//         const update = this.extractProductData(payload);
//         const result = await this.Products.findOneAndUpdate(
//             filter,
//             {$set: update},
//             {returnDocument: "after"}
//         );
//         return result.value;
//     }
        
//     async delete(id){
//         const result = await this.Products.findOneAndDelete({
//             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
//         });
//         return result.value;
//     }

//     async findFavorite () {
//         return await this.find({favorite: true})
//     }

//     async deleteAll() {
//         const result = await this.Products.deleteMany({});
//         return result.deletedCount;
//     }
// }


// module.exports = ProductsService;
