'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reviews extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Reviews.belongsTo(models.Products, {foreignKey: 'productId' })
      Reviews.belongsTo(models.Users, { foreignKey: 'userId'})
    }
  }
  Reviews.init({
    userId: DataTypes.INTEGER,
    productId: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    reviewText: DataTypes.STRING,
  }, {
    sequelize,
    updatedAt: false,
    modelName: 'Reviews',
  });
  return Reviews;
};