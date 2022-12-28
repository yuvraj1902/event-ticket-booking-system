const { Router } = require("express");
const controllers = require("../controllers");
const validators = require("../validators");
const genericResponse = require("../helper/generic-response.helper");
const { checkRefreshToken } = require("../middlewares/auth");
const router = Router();

router.post(
  "/register",
  validators.userValidator.registrationSchema,
  controllers.User.registration,
  genericResponse.sendResponse
);
router.post(
  "/login",
  validators.userValidator.loginSchema,
  controllers.User.loginUser,
  genericResponse.sendResponse
);
router.get(
  "/refresh-token",
  checkRefreshToken,
  controllers.User.refreshToken,
  genericResponse.sendResponse
);

module.exports = router;
