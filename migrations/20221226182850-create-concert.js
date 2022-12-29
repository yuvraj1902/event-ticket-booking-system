'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('concert', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.literal('uuid_generate_v4()')
      },
      event_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "event",
          key: 'id'
        }
      },
      audi_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "audi",
          key: 'id'
        }
      },
      concert_name: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      concert_duration: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlphanumeric: true,
      },
      concert_language: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      concert_date: {
        type: Sequelize.DATE,
        allowNull: false
      },
      artist_name: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      concert_genre: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE,
        defaultValue: null
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('concert');
  }
};