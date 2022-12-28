const { Router } = require('express');
const controllers = require('../controllers');
const validators=require("../validators")
const genericResponse = require('../helper/generic-response.helper');
const {checkAccessToken}=require('../middlewares/auth');
const { verifyUser } = require('../middlewares/user-verification');
const router = Router();

router.get(
    '/show-type',
    checkAccessToken,
    verifyUser,
    validators.showValidator.getShowTypeSchema,
    controllers.Show.getShowType,
    genericResponse.sendResponse
);
router.post(
    '/show',
    checkAccessToken,
    verifyUser,
    controllers.Show.createShow,
    genericResponse.sendResponse
);
router.post(
    '/movie',
    validators.showValidator.getMovieDetailsSchema,
    controllers.Show.getMovieDetails,
    genericResponse.sendResponse
);
router.post(
    '/concert',
    validators.showValidator.getConcertDetailsSchema,
    controllers.Show.getConcertDetails,
    genericResponse.sendResponse
);

module.exports=router;