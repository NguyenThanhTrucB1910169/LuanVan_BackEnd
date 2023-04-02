'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Carts.hasMany(models.CartItems, {as: "listCart", foreignKey: 'cartId'})
      Carts.belongsToMany(models.Products, { through: models.CartItems, foreignKey: 'cartId' })
      Carts.belongsTo(models.Users, { foreignKey: 'userId'})
    }
  }
  Carts.init({
   userId: {
    type: DataTypes.INTEGER,
   }
  }, {
    sequelize,
    updatedAt: false,
    modelName: 'Carts',
  });
  return Carts;
};