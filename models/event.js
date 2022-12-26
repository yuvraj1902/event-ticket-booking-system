'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      

    }
  }
  Event.init({
    eventName: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    eventDuration: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlphanumeric: true,
    },
    eventLanguage: {
      type: Sequelize.STRING,
      allowNull: false,
      isAlpha: true
    },
    eventDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    eventType: {
      type: Sequelize.ENUM,
      allowNull: false,
      values:['concert','movie']
    },
  }, {
    sequelize,
    modelName: 'Event',
    tableName:'event',
    paranoid:true
  });
  return Event;
};