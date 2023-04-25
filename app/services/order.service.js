import db from "../models/index";

const addOrder = (id, price, status, note) => {
  return new Promise(async (resolve, reject) => {
    try {
      const newOrder = await db.Orders.create({
        userId: id,
        totalPrice: price,
        status: status,
        note: note,
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
};

const getDetailOrder = (data) => {
  return new Promise(async (resolve, reject) => {
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
          "note",
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
          "User.phone",
        ],
        include: [
          { model: db.Products, attributes: [], through: { attributes: [] } },
          { model: db.Users, attributes: [] },
        ],
        raw: true,
      }).then((data) => {
        resolve(data);
      });
    } catch (error) {
      reject(error);
    }
  });
};

const updateStatus = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Orders.update({ status: status }, { where: { id: id } }).then(
        (result) => resolve(result)
      );
    } catch (error) {
      reject(error);
    }
  });
};

const getOrderStatus = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      await db.Orders.findAll(
        { where: { userId: id, status: status } }
      ).then((result) => resolve(result));
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
  updateStatus,
  getOrderStatus,
};
