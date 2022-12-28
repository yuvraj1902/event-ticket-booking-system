const { Router } = require('express');
const controllers = require('../controllers');
const validators=require("../validators")
const genericResponse = require('../helper/generic-response.helper');
const { verifyUser } = require('../middlewares/user-verification');
const { checkAccessToken } = require('../middlewares/auth');
const router = Router();

router.post(
    '/create-theatre',
    checkAccessToken,
    verifyUser,
    validators.theatreValidator.createTheatreSchema,
    controllers.Theatre.createTheatre,
    genericResponse.sendResponse
);

router.get(
    '/theatre',
    validators.theatreValidator.getTheatreSchema,
    controllers.Theatre.getTheatre,
    genericResponse.sendResponse
);

module.exports=router;