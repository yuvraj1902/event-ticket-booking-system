'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class AudiSeat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Audi, {
        foreignKey: "audi_id",
      });
      
    }
  }
  AudiSeat.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.literal('uuid_generate_v4()')
    },
    audiId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "audi",
        key: 'id'
      }
    },
    seatNo: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    seatType: {
      type: Sequelize.ENUM,
      allowNull: false,
      values:['platinum','gold','silver']
    },
  }, {
    sequelize,
    modelName: 'AudiSeat',
    tableName:'audi_seat',
    paranoid:true
  });
  return AudiSeat;
};