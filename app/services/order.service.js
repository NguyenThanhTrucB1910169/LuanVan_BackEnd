import db from "../models/index"

const addOrder = (id, price) => {
        return new Promise(async (resolve, reject) => {
          // console.log("userid" , userId);
            try {
            //   let findUser = await db.Order.findAll({where: {userId: userId}})
                // console.log(typeof findUser)
                // console.log(!findUser)
            //   if(findUser.length === 0) {
                // console.log(data)
               const newOrder = await db.Orders.create({
                  userId: id,
                  totalPrice: price
                })
                await newOrder.reload();
                
                resolve(newOrder)
            } catch (e) {
              reject(e);
            }
          });
}

const addOrderItem = (data) => {
    return new Promise(async (resolve, reject) => {
        // console.log(data);
        try {
            await db.OrderItems.create({
            orderId: data.orderId,
            productId: data.productId,
            quantity: data.quantity,
            price: data.price,
          });
          resolve(true);
        } catch (e) {
          reject(e);
        }
      });
}

const getOrderId = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
          console.log(userId);
          let orderId = await db.Orders.findOne({
            where: {userId: userId},
            attributes: ['id'], 
          },
          )
          resolve(orderId);
        } catch (e) {
          reject(e);
        }
      });
  }

const getByUser = (id) => {
    return new Promise(async(resolve, reject) => {
        // console.log(id);
        try {
            await db.Orders.findAll({
                where: {userId: id.id},
            }).then((data) => {
                resolve(data);
            })
        } catch (error) {
            reject(error)
        }
    })


    // where: {userId: id.id},
    // attributes: [
    //   'Products.OrderItems.productId', 'userId', 'id', 'createdAt', 'totalPrice', 'status', 'Products.name', 'Products.image', 'Products.price', 'Products.OrderItems.quantity'
    // ],
    // include: [
    //     {model: db.Products,  attributes: [],  through: { attributes: [] },}
    // ],
    // raw: true,
}

const getDetailOrder = (data) => {
  return new Promise(async(resolve, reject) => {
    // console.log(data);
    try {
      await db.Orders.findAll({
        where: {userId: data.user, id: data.id},
    attributes: [
      'Products.OrderItems.productId', 'userId', 'id', 'createdAt', 'totalPrice', 'status', 'Products.name', 'Products.image', 'Products.price', 'Products.OrderItems.quantity'
    ],
    include: [
        {model: db.Products,  attributes: [],  through: { attributes: [] },}
    ],
    raw: true,
      }).then((res) => {
        resolve(res)
      })
    } catch (error) {
      reject(error);
    }
  })
}

module.exports = {
    addOrder,
    addOrderItem,
    getOrderId,
    getByUser,
    getDetailOrder
}