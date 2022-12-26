'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize,Sequelize) => {
  class Audi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

      this.belongsTo(models.Theatre, {
        foreignKey: "theatre_id",
      });
      this.hasMany(models.AudiSeat, {
        as:""
      });
    }
  }
  Audi.init({
    theatreId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "theatre",
        key: 'id'
      }
    },
    noOfSeats: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Audi',
    tableName:'audi',
    paranoid:true
  });
  return Audi;
};