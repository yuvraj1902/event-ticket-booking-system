const { Router } = require("express");
const showController = require("../controllers/show.controller");
const showValidator = require("../validators/show.validator");
const genericResponse = require("../helper/generic-response.helper");
const { checkAccessToken } = require("../middlewares/auth");
const { verifyUser } = require("../middlewares/user-verification");
const router = Router();

router.get(
  "/show-type",
  checkAccessToken,
  verifyUser,
  showValidator.getShowTypeSchema,
  showController.getShowType,
  genericResponse.sendResponse
);
router.post(
  "/show",
  checkAccessToken,
  verifyUser,
  showController.createShow,
  genericResponse.sendResponse
);

module.exports = router;
