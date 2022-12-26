'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Event, {
        foreignKey: "event_id",
      });
      this.belongsTo(models.Audi, {
        foreignKey: "audi_id",
      });
      this.belongsTo(models.Address, {
        foreignKey: "address_id",
      });
      this.hasMany(models.Booking, {
        as:""
      });
    }
  }
  Movie.init({
    eventId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "event",
        key: 'id'
      }
    },
    audiId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "audi",
        key: 'id'
      }
    },
    addressId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "address",
        key: 'id'
      }
    },
    movieDesc: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    movieCrew: {
      type: Sequelize.ARRAY(Sequelize.STRING),
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Movie',
    tableName:'movie',
    paranoid:true
  });
  return Movie;
};