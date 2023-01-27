'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasOne(models.Carts, {foreignKey: 'userId'})
    }
  }
  Users.init({
    fullname: DataTypes.STRING,
    username: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING,
    phone: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    updatedAt: false,
    modelName: 'Users',
  });
  return Users;
};