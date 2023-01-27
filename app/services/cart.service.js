import db from "../models/index";
const sequelize = require("sequelize");

const cartCreate = (userId) => {
    return new Promise(async (resolve, reject) => {
      console.log("userid" , userId);
        try {
          let findUser = await db.Carts.findAll({where: {userId: userId}}).catch(
            (err) => {
              console.log(err);
            }
          );
          if(findUser) {
          resolve("Alrealdy have");
          } else {
            await db.Carts.create({
              userId: userId,
            }).then(() => {
              resolve("Creat done");
            })
          }
        } catch (e) {
          reject(e);
        }
      });
}


const getCartId = (userId) => {
  return new Promise(async (resolve, reject) => {
      try {
        let cartid = await db.Carts.findOne({
          where: {userId: userId},
          attributes: ['id'], 
        },
        )
        resolve(cartid);
      } catch (e) {
        reject(e);
      }
    });
}

const createCartItem = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
          // console.log(data);
          // console.log(data.cartId)
          await db.CartItems.create({
            cartId: data.cartId,
            productId: data.productId,
            quantity: data.quantity
          });
          resolve("Creat done");
        } catch (e) {
          reject(e);
        }
      });
}

const getCart = (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let data = await db.Carts.findAll({
                where: {userId: userId},
                attributes: [
                  'Products.CartItems.productId', 'userId', 'Products.name', 'Products.image', 'Products.type', 'Products.material', 'Products.price', 'Products.CartItems.cartId', 'Products.CartItems.quantity'
                ],
                include: [
                    {model: db.Products,  attributes: [],  through: { attributes: [] },}
                ],
                raw: true,
            })
            resolve(data);
        } catch (error) {
            console.log(error);
        }
    })
}

const updateCartItem = (userId, req) => {
  return new Promise(async(resolve, reject) => {
    console.log(req)
    try {
      await getCartId(userId).then(async(response) => {
        // console.log(response);
        await db.CartItems.update(
          {quantity: req.quantity},
           { where: {cartId: response.id,
              productId: req.id
            },}
          ).then((data) => {
              resolve(data);
          }) 
      })
      // console.log(cartid)
      // console.log('update', req.id)
      
    } catch (error) {
      reject(error);
    }
  })
}


module.exports = {
    cartCreate,
    getCart,
    createCartItem,
    getCartId,
    updateCartItem
};
