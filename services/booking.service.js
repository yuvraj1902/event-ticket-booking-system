const models = require("../models");
const { sequelize } = require("../models");
const moment = require("moment");
const createMovieBooking = async (payload, user) => {
  const trans = await sequelize.transaction();
  try {
    const isLocked = moment().format("hh:mm:ss");
    const lockTime = moment().add(11, "minutes").format("hh:mm:ss");
    const newPayload = {
      userId: user.id,
      movieId: payload.movieId,
      isLocked: isLocked,
      lockTime: lockTime,
    };
    await models.Booking.create(newPayload, {
      transaction: trans,
    });

    await trans.commit();
    return "movie  booking  has successfully created";
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error };
  }
};

const createConcertBooking = async (payload, user) => {
  const trans = await sequelize.transaction();
  try {
    const isLocked = moment().format("hh:mm:ss");
    const lockTime = moment().add(11, "minutes").format("hh:mm:ss");
    const newPayload = {
      userId: user.id,
      concertId: payload.movieId,
      isLocked: isLocked,
      lockTime: lockTime,
    };
    await models.Booking.create(newPayload, {
      transaction: trans,
    });

    await trans.commit();
    return "concert  booking  has successfully created";
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error };
  }
};

const getBooking = async (payload, user) => {
  const booking = await models.Booking.findAll({
    attributes: {
      exclude: [
        "deleted_at",
        "created_at",
        "updated_at",
        "lockTime",
        "isLocked",
        "user_id",
        "movie_id",
        "concert_id",
      ],
    },
    where: { user_id: user.id },
  });
  return booking;
};
module.exports = {
  createMovieBooking,
  createConcertBooking,
  getBooking,
};
