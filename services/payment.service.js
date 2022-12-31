const models = require("../models");
const moment = require("moment");
const { sequelize } = require("../models");
const createPayment = async (payload, booking) => {
  const trans = await sequelize.transaction();
  try {

    const getPayment = await models.Payment.findOne(
        { where: { booking_id: booking.id } },
        { transaction: trans }
      );
      if (getPayment) {
        throw new Error("Payment can't be done for this booking again");
      }
    const getBooking = await models.Booking.findOne(
      { where: { id: booking.id } },
      { transaction: trans }
    );
    if (!getBooking) {
      throw new Error("booking doesn't exists");
    }
    if (getBooking.bookingStatus == "failed") {
      throw new Error("booking failed can't make the payment");
    }
    if (getBooking.bookingStatus == "booked") {
        throw new Error("payment can't be done for this booking again ");
      }
    
    const showSeat = await models.ShowSeat.findAll(
      {
        attributes: {
          exclude: ["deleted_at", "created_at", "updated_at"],
        },
        where: { booking_id: booking.id },
      },
      { transaction: trans }
    );
    if (!showSeat[0]) {
      throw new Error("booking id is incorrect");
    }
    
    const currentTime = moment().format("hh:mm:ss");
    if (currentTime <= getBooking.lockTime) {
      let sum = 0;
      for (let i = 0; i < showSeat.length; i++) {
        sum += showSeat[i].seatPrice;
      }
    
      if (payload.amount == sum) {
        const newPayload = {
          bookingId: booking.id,
          amount: payload.amount,
          paymentMethod: payload.paymentMethod,
        };
        
        await models.Payment.create(newPayload,{transaction:trans})
        await models.Booking.update(
          { booking_status: "booked" },
          { where: { id: booking.id } },
          { transaction: trans }
        );
        await trans.commit();
        return "Payment Successful";
      } else {
        await models.Booking.update(
          { booking_status: "failed" },
          { where: { id: booking.id } },
          { transaction: trans }
        );
        await trans.commit();
        return "Payment failed";
      }
    } else {
      await models.Booking.update(
        { booking_status: "failed" },
        { where: { id: booking.id } },
        { transaction: trans }
      );
      await trans.commit();
      return "Payment failed";
    }
  } catch (error) {
    await trans.rollback();
    return { data: null, error: error };
  }
};

module.exports = {
  createPayment,
};
