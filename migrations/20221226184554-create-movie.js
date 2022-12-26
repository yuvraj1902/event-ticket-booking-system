'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movie', {
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
      address_id: {
        allowNull: false,
        type: Sequelize.UUID,
        references: {
          model: "address",
          key: 'id'
        }
      },
      movie_desc: {
        type: Sequelize.STRING,
        allowNull: false,
        isAlpha: true
      },
      movie_crew: {
        type: Sequelize.ARRAY(Sequelize.STRING),
		    allowNull: false
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
    await queryInterface.dropTable('movie');
  }
};