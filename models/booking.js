'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      this.belongsTo(models.Concert, {
        foreignKey: "concert_id",
      });
      this.belongsTo(models.Movie, {
        foreignKey: "movie_id",
      });
      this.hasOne(models.Payment, {
        as:""
      });
    }
  }
  Booking.init({
    user_id: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "user",
        key: 'id'
      }
    },
    concertId: {
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "concert",
        key: 'id'
      }
    },
    movieId: {
      allowNull: true,
      type: Sequelize.UUID,
      references: {
        model: "movie",
        key: 'id'
      }
    },
    bookSeat: {
      type: Sequelize.NUMBER,
      allowNull: false
    },
    isLocked:{
      allowNull: false,
      type: Sequelize.TIME,
      defaultValue: Sequelize.NOW
    },
    lockTime: {
      allowNull: false,
      type: Sequelize.TIME,
      defaultValue: Sequelize.NOW + 10
    },
    bookingStatus: {
      type: Sequelize.ENUM,
      allowNull: false,
      values:['booked','pending','failed']
    },
  }, {
    sequelize,
    modelName: 'Booking',
    tableName:'booking',
    paranoid:true
  });
  return Booking;
};