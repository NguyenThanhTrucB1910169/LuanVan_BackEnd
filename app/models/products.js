'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Products.hasMany(models.CartItems, {foreignKey: 'productId'})
      Products.belongsToMany(models.Carts, { through: models.CartItems, foreignKey: 'productId' })

    }
  }
  Products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    image: DataTypes.STRING,
    type: DataTypes.STRING,
    material: DataTypes.STRING,
    price: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
  }, {
    sequelize,
    updatedAt: false,
    modelName: 'Products',
  });
  return Products;
};