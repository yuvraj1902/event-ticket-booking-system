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
router.delete(
    '/movie',
    checkAccessToken,
    verifyUser,
    validators.showValidator.deleteMovieSchema,
    controllers.Show.deleteMovie,
    genericResponse.sendResponse
);
router.delete(
    '/concert',
    checkAccessToken,
    verifyUser,
    validators.showValidator.deleteConcertSchema,
    controllers.Show.deleteConcert,
    genericResponse.sendResponse
);
router.put(
    '/movie',
    checkAccessToken,
    verifyUser,
    validators.showValidator.updateMovieSchema,
    controllers.Show.updateMovie,
    genericResponse.sendResponse
);
router.put(
    '/concert',
    checkAccessToken,
    verifyUser,
    validators.showValidator.updateConcertSchema,
    controllers.Show.updateConcert,
    genericResponse.sendResponse
);

module.exports=router;