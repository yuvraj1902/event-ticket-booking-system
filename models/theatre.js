'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Theatre extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Address, {
        foreignKey: "address_id",
      });
    }
  }
  Theatre.init({
    addressId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "address",
        key: 'id'
      }
    },
    theatreName: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    noOfSeats: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Theatre',
    tableName:'theatre',
    paranoid:true
  });
  return Theatre;
};