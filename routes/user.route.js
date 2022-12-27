const { Router } = require('express');
const controllers = require('../controllers');
const validators=require("../validators")
const genericResponse = require('../helper/generic-response');
const { checkAccessToken } = require('../middlewares/auth');
const { verifyUser } = require('../middlewares/user-verification');
const router = Router();

router.post(
    '/register',
    checkAccessToken,
    verifyUser,
    validators.userValidator.registrationSchema,
    controllers.User.registration,
    genericResponse.sendResponse
);
router.post(
    '/login',
    validators.userValidator.loginSchema,
    controllers.User.loginUser,
    genericResponse.sendResponse
);

module.exports = router;