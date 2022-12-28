const { Router } = require('express');
const controllers = require('../controllers');
const validators=require("../validators")
const genericResponse = require('../helper/generic-response.helper');
const { verifyUser } = require('../middlewares/user-verification');
const { checkAccessToken } = require('../middlewares/auth');
const router = Router();

router.post(
    '/create-address',
    checkAccessToken,
    verifyUser,
    validators.addressValidator.createAddressSchema,
    controllers.Address.createAddress,
    genericResponse.sendResponse
);

router.get(
    '/address',
    controllers.Address.getAddress,
    genericResponse.sendResponse
);

module.exports=router;