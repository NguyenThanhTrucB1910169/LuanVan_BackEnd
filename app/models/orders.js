"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Orders.hasMany(models.CartItems, {as: "listCart", foreignKey: 'cartId'})
      // Orders.belongsToMany(models.Products, {
      //   through: models.OrderItems,
      //   foreignKey: "orderId",
      // });
      Orders.hasMany(models.OrderItems, { foreignKey: 'orderId' });
      Orders.belongsTo(models.Users, { foreignKey: "userId" });
    }
  }
  Orders.init(
    {
      userId: DataTypes.INTEGER,
      status: DataTypes.INTEGER,
      totalPrice: DataTypes.INTEGER,
      payment: DataTypes.STRING,
      note: DataTypes.STRING,
    },
    {
      sequelize,
      updatedAt: false,
      modelName: "Orders",
    }
  );
  return Orders;
};
