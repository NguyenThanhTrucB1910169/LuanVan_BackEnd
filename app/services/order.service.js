import db from "../models/index";

// const addOrder = (id, price, status, note, payment) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       const newOrder = await db.Orders.create({
//         userId: id,
//         totalPrice: price,
//         status: status,
//         note: note,
//         payment: payment,
//       });
//       await newOrder.reload();
//       resolve(newOrder);
//     } catch (e) {
//       reject(e);
//     }
//   });
// };

const addOrder = (id, price, status, note, payment, items) => {
  return new Promise(async (resolve, reject) => {
    let transaction;
    let addedProducts = []; // Mảng lưu danh sách sản phẩm đã thêm vào đơn hàng

    try {
      // Bắt đầu một giao dịch cơ sở dữ liệu
      transaction = await db.sequelize.transaction();

      // Bước 1: Tạo một đơn hàng mới
      const newOrder = await db.Orders.create(
        {
          userId: id,
          totalPrice: price,
          status: status,
          note: note,
          payment: payment,
        },
        { transaction }
      );

      // Bước 2: Lưu đối tượng đơn hàng mới vào cơ sở dữ liệu
      await newOrder.reload({ transaction });

      // Bước 3: Thêm các mặt hàng vào đơn hàng (OrderItems) và lưu lại sản phẩm đã thêm vào danh sách
      for (const item of items) {
        const orderItem = await db.OrderItems.create(
          {
            orderId: newOrder.id,
            name: item.name,
            image: item.image,
            price: item.price,
            quantity: item.quantity,
          },
          { transaction }
        );

        addedProducts.push(orderItem);
      }

      // Commit giao dịch
      await transaction.commit();

      // Trả về đơn hàng và danh sách sản phẩm đã thêm
      resolve({ newOrder, products: addedProducts });
    } catch (e) {
      // Rollback giao dịch nếu có lỗi
      if (transaction) await transaction.rollback();

      reject(e);
    }
  });
};



const addOrderItem = (data) => {
  return new Promise(async (resolve, reject) => {
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
        // console.log("main", res.count);
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

const getOrderById = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      db.Orders.findOne({
        where: { id: id },
        include: [
          {
            model: db.Products, // Model của sản phẩm
            through: { model: db.OrderItems, as: "orderItems" }, // Model của bảng trung gian
          },
        ],
      })
        .then((order) => {
          if (!order) {
            resolve("");
          } else {
            console.log(order.dataValues);
            resolve(order.dataValues);
          }
        })
        .catch((error) => {
          reject(error);
        });
      // resolve(true);
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

// const getDetailOrder = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       await db.Orders.findAll({
//         where: { userId: data.user, id: data.id },
//         attributes: [
//           "Products.OrderItems.productId",
//           "userId",
//           "id",
//           "createdAt",
//           "totalPrice",
//           "status",
//           "note",
//           "Products.name",
//           "Products.image",
//           "Products.price",
//           "Products.OrderItems.quantity",
//         ],
//         include: [
//           { model: db.Products, attributes: [], through: { attributes: [] } },
//         ],
//         raw: true,
//       }).then((res) => {
//         resolve(res);
//       });
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

// const getDetailOrder = (data) => {
//   return new Promise(async (resolve, reject) => {
//     try {
//       console.log("VAO GETDETAILORDER");    
//       const orderDetails = await db.Orders.findAll({
//         where: { userId: data.user, id: data.id },
//         attributes: [
//           "userId",
//           "id",
//           "createdAt",
//           "totalPrice",
//           "status",
//           "note",
//         ],
//         include: [
//           {
//             model: db.Products,
//             attributes: ["name", "image", "price", "id"],
//             through: {
//               model: db.OrderItems,
//               attributes: ["quantity"],
//             },
//           },
//         ],
//         raw: true,
//       });
//       const listProductsId = await db.OrderItems.findAll({
//         where: {
//           orderId: data.id,
//         },
//         attributes: ["productId"],
//         raw: true,
//       });
//       const transformedOrderDetails = orderDetails.map((order) => {
//         const {
//           "Products.name": name,
//           "Products.image": image,
//           "Products.price": price,
//           "Products.OrderItems.quantity": quantity,
//           "Products.id": id,
//           ...rest
//         } = order;
//         if(id === null) {
//           return {...rest, Products: {} }
//         } else{
//           return { ...rest, Products: { id, name, image, price, quantity } };
//         }
//       });
//       const productIdList = listProductsId.map((item) => item.productId);
//       const differentIds = productIdList.filter((productId) => {
//         return !transformedOrderDetails.some(
//           (order) => order.Products.id === productId
//         );
//       });
//       const result = {
//         idNotExists: differentIds,
//         detailOrders: transformedOrderDetails,
//       };
//       resolve(result);
//     } catch (error) {
//       reject(error);
//     }
//   });
// };

const getDetailOrder = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      const orderDetails = await db.Orders.findOne({
        where: { userId: data.user, id: data.id },
        include: [
          {
            model: db.OrderItems,
            attributes: ["name", "image", "price", "quantity"],
          },
        ],
      });

      if (orderDetails) {
        resolve(orderDetails);
      } else {
        resolve(null); // Hoặc reject với thông báo lỗi tùy theo trường hợp
      }
    } catch (error) {
      reject(error);
    }
  });
};


const getAllOrders = () => {
  // return new Promise(async (resolve, reject) => {
  //   try {
  //     await db.Orders.findAll({
  //       attributes: [
  //         "Products.OrderItems.productId",
  //         "userId",
  //         "id",
  //         "createdAt",
  //         "totalPrice",
  //         "status",
  //         "Products.name",
  //         "Products.price",
  //         "Products.OrderItems.quantity",
  //         "User.fullname",
  //         "User.phone",
  //         "User.address"
  //       ],
  //       include: [
  //         { model: db.Products, attributes: [], through: { attributes: [] } },
  //         { model: db.Users, attributes: [] },
  //       ],
  //       raw: true,
  //     }).then((data) => {
  //       resolve(data);
  //     });
  //   } catch (error) {
  //     reject(error);
  //   }
  // });
  return new Promise(async (resolve, reject) => {
    try {
      const allOrders = await db.Orders.findAll({
        include: [
          {
            model: db.OrderItems,
            attributes: ["name", "image", "price", "quantity"],
          },
        ],
      });

      if (allOrders) {
        resolve(allOrders);
      } else {
        resolve(null);
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateStatus = (id, status) => {
  return new Promise(async (resolve, reject) => {
    try {
      console.log(status);
      console.log(id);
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
      await db.Orders.findAll({ where: { userId: id, status: status } }).then(
        (result) => resolve(result)
      );
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
  getOrderById,
};
