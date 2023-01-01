const models = require("../models");

const getShowType = async (payload) => {
  try {
    const event = await models.Event.findOne({
      where: { id: payload.eventId },
    });
    if (!event) {
      throw new Error("Event does not exist ");
    }

    return ` event_type : ${event.eventType} `;
  } catch (error) {
    return { data: null, error: error };
  }
};
const createShow = async (payload) => {
  try {
    const event = await models.Event.findOne({
      where: { id: payload.eventId },
    });
    if (!event) {
      throw new Error("Event does not exist ");
    }
    if (event.eventType == "movie") {
      const movie = await models.Movie.create(payload);
      return "movie show has successfully created";
    }
    const concert = await models.Concert.create(payload);
    return "concert show has successfully created";
  } catch (error) {
    return { data: null, error: error };
  }
};

module.exports = {
  createShow,
  getShowType,
};
