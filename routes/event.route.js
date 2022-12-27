const { Router } = require('express');
const controllers = require('../controllers');
const validators=require("../validators")
const genericResponse = require('../helper/generic-response.helper');
const { verifyUser } = require('../middlewares/user-verification');
const { checkAccessToken } = require('../middlewares/auth');
const router = Router();

router.post(
    '/create-event',
    checkAccessToken,
    verifyUser,
    validators.eventValidator.createEventSchema,
    controllers.Event.createEvent,
    genericResponse.sendResponse
);

router.get(
    '/event',
    controllers.Event.getEvent,
    genericResponse.sendResponse
);

module.exports=router;