"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  OrderItems.init(
    {
      orderId: DataTypes.INTEGER,
      productId: DataTypes.STRING,
      quantity: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      updatedAt: false,
      createdAt: false,
      modelName: "OrderItems",
    }
  );
  OrderItems.removeAttribute("id");
  return OrderItems;
};
