import db from "../models/index";

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
        totalPrice: price,
      });
      await newOrder.reload();

      resolve(newOrder);
    } catch (e) {
      reject(e);
    }
  });
};

const addOrderItem = (data) => {
  return new Promise(async (resolve, reject) => {
    console.log(data);
    try {
      await db.OrderItems.create({
        orderId: data.orderId,
        productId: data.productId,
        quantity: data.quantity,
        price: data.price,
      });
      await db.Products.findOne({
        where: { id: data.productId },
        attributes: ["count"],
      }).then(async (res) => {
        console.log("main", res.count);
        let remain = res.count - data.quantity;
        await db.Products.update(
          { count: remain },
          { where: { id: data.productId } }
        );
      });
      resolve(true);
    } catch (e) {
      reject(e);
    }
  });
};

const getOrderId = (userId) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(userId);
      let orderId = await db.Orders.findOne({
        where: { userId: userId },
        attributes: ["id"],
      });
      resolve(orderId);
    } catch (e) {
      reject(e);
    }
  });
};

const getByUser = (id) => {
  return new Promise(async (resolve, reject) => {
    // console.log(id);
    try {
      await db.Orders.findAll({
        where: { userId: id.id },
      }).then((data) => {
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });

  // where: {userId: id.id},
  // attributes: [
  //   'Products.OrderItems.productId', 'userId', 'id', 'createdAt', 'totalPrice', 'status', 'Products.name', 'Products.image', 'Products.price', 'Products.OrderItems.quantity'
  // ],
  // include: [
  //     {model: db.Products,  attributes: [],  through: { attributes: [] },}
  // ],
  // raw: true,
};

const getDetailOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    // console.log(data);
    try {
      await db.Orders.findAll({
        where: { userId: data.user, id: data.id },
        attributes: [
          "Products.OrderItems.productId",
          "userId",
          "id",
          "createdAt",
          "totalPrice",
          "status",
          "Products.name",
          "Products.image",
          "Products.price",
          "Products.OrderItems.quantity",
        ],
        include: [
          { model: db.Products, attributes: [], through: { attributes: [] } },
        ],
        raw: true,
      }).then((res) => {
        resolve(res);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const getAllOrders = () => {
  return new Promise(async (resolve, reject) => {
    try {
      // await db.Orders.findAll({
      //   attributes: [
      //     "userId",
      //     "id",
      //     // 'Users.fullname',
      //     // 'Users.phone',
      //     "totalPrice",
      //   ],
      //   include: [{ model: db.Users, attributes: ["fullname", "phone"] }],
      //   raw: true,
      // }).then((data) => {
      //   console.log(data);
      // });
      await db.Orders.findAll({
        attributes: [
          "Products.OrderItems.productId",
          "userId",
          "id",
          "createdAt",
          "totalPrice",
          "status",
          "Products.name",
          "Products.price",
          "Products.OrderItems.quantity",
          "User.fullname",
          "User.phone"
        ],
        include: [
          { model: db.Products, attributes: [], through: { attributes: [] } },
          { model: db.Users, attributes: [] },
        ],
        raw: true,
      }).then((data) => {
        resolve(data)
      })
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  addOrder,
  addOrderItem,
  getOrderId,
  getByUser,
  getDetailOrder,
  getAllOrders,
};
