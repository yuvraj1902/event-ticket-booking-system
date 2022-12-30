const { Router } = require('express');
const bookingController = require('../controllers/booking.controller');
const bookingValidator=require("../validators/booking.validator")
const genericResponse = require('../helper/generic-response.helper');
const { verifyUser } = require('../middlewares/user-verification');
const { checkAccessToken } = require('../middlewares/auth');
const router = Router();

router.post(
    '/create-movie-booking',
    checkAccessToken,
    //bookingValidator.createBookingSchema,
    bookingController.createMovieBooking,
    genericResponse.sendResponse
);

router.post(
    '/create-concert-booking',
    checkAccessToken,
    //bookingValidator.createBookingSchema,
    bookingController.createConcertBooking,
    genericResponse.sendResponse
);

router.get(
    '/booking',
    checkAccessToken,
    bookingController.getBooking,
    genericResponse.sendResponse
);

module.exports=router;