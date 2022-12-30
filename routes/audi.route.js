const { Router } = require('express');
const audicontroller = require('../controllers/audi.controller');
const audiValidator=require("../validators/audi.validator")
const genericResponse = require('../helper/generic-response.helper');
const { verifyUser } = require('../middlewares/user-verification');
const { checkAccessToken } = require('../middlewares/auth');
const router = Router();

router.post(
    '/create-audi',
    checkAccessToken,
    verifyUser,
    audiValidator.createAudiSchema,
    audicontroller.createAudi,
    genericResponse.sendResponse
);

router.get(
    '/audi',
    audiValidator.getAudiSchema,
    audicontroller.getAudi,
    genericResponse.sendResponse
);

module.exports=router;