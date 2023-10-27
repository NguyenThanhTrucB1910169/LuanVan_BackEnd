"use strict"
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('Products', 'description', {
      type: Sequelize.STRING(5000),
    });
    // await queryInterface.addColumn('Products', 'category', {
    //   type: Sequelize.STRING(500)
    // })
  },
  down: async (queryInterface, Sequelize) => {
    // await queryInterface.dropTable('Products');
  }
};