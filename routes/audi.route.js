const { Router } = require('express');
const controllers = require('../controllers');
const validators=require("../validators")
const genericResponse = require('../helper/generic-response.helper');
const { verifyUser } = require('../middlewares/user-verification');
const { checkAccessToken } = require('../middlewares/auth');
const router = Router();

router.post(
    '/create-audi',
    checkAccessToken,
    verifyUser,
    validators.audiValidator.createAudiSchema,
    controllers.Audi.createAudi,
    genericResponse.sendResponse
);

router.get(
    '/audi',
    validators.audiValidator.getAudiSchema,
    controllers.Audi.getAudi,
    genericResponse.sendResponse
);

module.exports=router;