'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CartItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {   
    }
  }
  CartItems.init({
    cartId: DataTypes.INTEGER,
    productId: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    // id: false,
    updatedAt: false,
    createdAt: false,
    modelName: 'CartItems',
  });
  CartItems.removeAttribute('id');
  return CartItems;
};