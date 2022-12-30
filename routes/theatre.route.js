const { Router } = require('express');
const theatreController = require('../controllers/theatre.controller');
const theatreValidator=require("../validators/theatre.validator")
const genericResponse = require('../helper/generic-response.helper');
const { verifyUser } = require('../middlewares/user-verification');
const { checkAccessToken } = require('../middlewares/auth');
const router = Router();

router.post(
    '/create-theatre',
    checkAccessToken,
    verifyUser,
    theatreValidator.createTheatreSchema,
    theatreController.createTheatre,
    genericResponse.sendResponse
);

router.get(
    '/theatre',
    theatreValidator.getTheatreSchema,
    theatreController.getTheatre,
    genericResponse.sendResponse
);

module.exports=router;