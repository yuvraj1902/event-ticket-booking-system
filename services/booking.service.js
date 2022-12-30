const models = require("../models");
const { sequelize } = require("../models");
const moment = require("moment");
const createMovieBooking = async (payload, user) => {
  const trans = await sequelize.transaction();
  try {
    const audiSeat = await models.ShowSeat.findOne(
      {
        where: {
          audi_seat_id: payload.audiSeatId,
        },
      },
      { transaction: trans }
    );

    if (audiSeat) {
      if (audiSeat.seatStatus == "filled") {
        throw new Error("Seat can't be book");
      } else if (audiSeat.seatStatus == "unfilled") {
        const isLocked = moment().format("hh:mm:ss");
        const lockTime = moment().add(11, "minutes").format("hh:mm:ss");
        const newPayload = {
          userId: user.id,
          movieId: payload.movieId,
          isLocked: isLocked,
          lockTime: lockTime,
        };

        const booking = await models.Booking.create(newPayload, {
          transaction: trans,
        });

        const showSeatPayload = {
          bookingId: booking.id,
          audiSeatId: payload.audiSeatId,
          seatPrice: payload.seatPrice,
        };
        await models.ShowSeat.create(showSeatPayload, { transaction: trans });
      }
    } else {
      const isLocked = moment().format("hh:mm:ss");
      const lockTime = moment().add(11, "minutes").format("hh:mm:ss");
      const newPayload = {
        userId: user.id,
        movieId: payload.movieId,
        isLocked: isLocked,
        lockTime: lockTime,
      };
      const booking = await models.Booking.create(newPayload, {
        transaction: trans,
      });
      const showSeatPayload = {
        bookingId: booking.dataValues.id,
        audiSeatId: payload.audiSeatId,
        seatPrice: payload.seatPrice,
      };
      await models.ShowSeat.create(showSeatPayload, { transaction: trans });
    }
    await trans.commit();
    return "movie booking  has successfully created";
  } catch (error) {
    console.log(error);
    await trans.rollback();
    return { data: null, error: error };
  }
};

const createConcertBooking = async (payload, user) => {
    const trans = await sequelize.transaction();
  try {
    const audiSeat = await models.ShowSeat.findOne(
      {
        where: {
          audi_seat_id: payload.audiSeatId,
        },
      },
      { transaction: trans }
    );

    if (audiSeat) {
      if (audiSeat.seatStatus == "filled") {
        throw new Error("Seat can't be book");
      } else if (audiSeat.seatStatus == "unfilled") {
        const isLocked = moment().format("hh:mm:ss");
        const lockTime = moment().add(11, "minutes").format("hh:mm:ss");
        const newPayload = {
          userId: user.id,
          concertId: payload.concertId,
          isLocked: isLocked,
          lockTime: lockTime,
        };

        const booking = await models.Booking.create(newPayload, {
          transaction: trans,
        });

        const showSeatPayload = {
          bookingId: booking.id,
          audiSeatId: payload.audiSeatId,
          seatPrice: payload.seatPrice,
        };
        await models.ShowSeat.create(showSeatPayload, { transaction: trans });
      }
    } else {
      const isLocked = moment().format("hh:mm:ss");
      const lockTime = moment().add(11, "minutes").format("hh:mm:ss");
      const newPayload = {
        userId: user.id,
        concertId: payload.concertId,
        isLocked: isLocked,
        lockTime: lockTime,
      };
      const booking = await models.Booking.create(newPayload, {
        transaction: trans,
      });
      const showSeatPayload = {
        bookingId: booking.dataValues.id,
        audiSeatId: payload.audiSeatId,
        seatPrice: payload.seatPrice,
      };
      await models.ShowSeat.create(showSeatPayload, { transaction: trans });
    }
    await trans.commit();
    return "concert booking  has successfully created";
  } catch (error) {
    console.log(error);
    await trans.rollback();
    return { data: null, error: error };
  }
};

const getBooking = async (payload,user) => {
  const booking = await models.Booking.findAll({
    attributes: { exclude: ["deleted_at"] },
    where:{user_id:user.id}
  });
  return booking;
};
module.exports = {
  createMovieBooking,
  createConcertBooking,
  getBooking,
};
