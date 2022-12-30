const { Router } = require('express');
const controllers = require('../controllers');
const validators=require("../validators")
const genericResponse = require('../helper/generic-response.helper');
const { verifyUser } = require('../middlewares/user-verification');
const { checkAccessToken } = require('../middlewares/auth');
const router = Router();

router.post(
    '/create-audi-seat',
    checkAccessToken,
    verifyUser,
    validators.audiSeatValidator.createAudiSeatSchema,
    controllers.AudiSeat.createAudiSeat,
    genericResponse.sendResponse
);

router.get(
    '/audi-seat',
    validators.audiSeatValidator.getAudiSeatSchema,
    controllers.AudiSeat.getAudiSeat,
    genericResponse.sendResponse
);

module.exports=router;