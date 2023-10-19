'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER
      },
      // address: {
      //   type: Sequelize.STRING
      // },
      status: {
        type: Sequelize.INTEGER
      },  
      totalPrice: {
        type: Sequelize.INTEGER
      },
      payment: {
        type: Sequelize.STRING(500)
      },
      note: {
        type: Sequelize.STRING(500)
      },        
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};