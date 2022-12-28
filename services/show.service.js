const models = require("../models");
const { sequelize } = require("../models");

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
      
      const audi = await models.Movie.findOne({
        where: { audi_id: payload.audiId },
      });
      console.log(audi);
      if (audi) {
        throw new Error("Audi already exists");
      }
      const movie = await models.Movie.create(payload);
      return "movie show has successfully created";
    } else if (event.eventType == "concert") {
      
      const audi = await models.Concert.findOne({
        where: { audi_id: payload.audiId },
      });
      if (audi) {
        throw new Error("Audi already exists");
      }
      const concert = await models.Concert.create(payload);
      return "concert show has successfully created";
    } else {
      return "Event Type is not correct";
    }
  } catch (error) {
    return { data: null, error: error };
  }
};

const getMovieDetails = async (payload) => {
  const trans = await sequelize.transaction();
  try {
    const address = await models.Address.findOne(
      {
        where: { pin_code: payload.pinCode },
      },
      { transaction: trans }
    );
    if (!address) {
      throw new Error("Address does not exists");
    }
    const theatre = await models.Theatre.findOne(
      {
        where: {
          address_id: address.id,
        },
      },
      { transaction: trans }
    );
    if (!theatre) {
      throw new Error("Theatre does not exists");
    }
    const audi = await models.Audi.findAll(
      {
        where: {
          theatre_id: theatre.id,
        },
      },
      { transaction: trans }
    );
    if (!audi[0]) {
      throw new Error("Audi does not exists");
    }

    let movies = [];
    for (let i = 0; i < audi.length; i++) {
      const movie = await models.Movie.findOne(
        {
          attributes: {
            exclude: [
              "created_at",
              "updated_at",
              "deleted_at",
              "audi_id",
              "event_id",
            ],
          },
          where: {
            audi_id: audi[i].id,
          },
        },
        { transaction: trans }
      );
      if (!movie) continue;
      else {
        const event = await models.Event.findOne(
          {
            where: {
              id: movie.eventId,
            },
          },
          { transaction: trans }
        );

        const show = {
          movieName: event.eventName,
          movieDesc: movie.movieDesc,
          movieCrew: movie.movieCrew,
          movieDuration: event.eventDuration,
          movieLanguage: event.eventLanguage,
          movieDate: event.eventDate,
          startTime: movie.startTime,
          endTime: movie.endTime,
        };
        movies.push(show);
      }
    }
    await trans.commit();
    return movies;
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error };
  }
};

const getConcertDetails = async (payload) => {
  const trans = await sequelize.transaction();
  try {
    const address = await models.Address.findOne(
      {
        where: { pin_code: payload.pinCode },
      },
      { transaction: trans }
    );
    if (!address) {
      throw new Error("Address does not exists");
    }
    const theatre = await models.Theatre.findOne(
      {
        where: {
          address_id: address.id,
        },
      },
      { transaction: trans }
    );
    if (!theatre) {
      throw new Error("Theatre does not exists");
    }
    const audi = await models.Audi.findAll(
      {
        where: {
          theatre_id: theatre.id,
        },
      },
      { transaction: trans }
    );
    if (!audi[0]) {
      throw new Error("Audi does not exists");
    }

    let movies = [];
    for (let i = 0; i < audi.length; i++) {
      const concert = await models.Concert.findOne(
        {
          attributes: {
            exclude: [
              "created_at",
              "updated_at",
              "deleted_at",
              "audi_id",
              "event_id",
            ],
          },
          where: {
            audi_id: audi[i].id,
          },
        },
        { transaction: trans }
      );
      if (!concert) continue;
      else {
        const event = await models.Event.findOne(
          {
            where: {
              id: concert.eventId,
            },
          },
          { transaction: trans }
        );

        const show = {
          concertName: event.eventName,
          artistName: concert.artistName,
          concertGenre: concert.concertGenre,
          concertDuration: event.eventDuration,
          concertLanguage: event.eventLanguage,
          concertDate: event.eventDate
        };
        movies.push(show);
      }
    }
    await trans.commit();
    return movies;
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error };
  }
};

module.exports = {
  createShow,
  getShowType,
  getMovieDetails,
  getConcertDetails
};
