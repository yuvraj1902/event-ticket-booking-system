'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('address', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      address_name: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      city_part: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      pin_code: {
        type: Sequelize.STRING,
        allowNull: false,
        validate:{
          isNumeric:true
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('address');
  }
};