const { commonErrorHandler } = require("../helper/error-handler.helper");
const userService = require("../services/user.service");

const registration = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await userService.registration(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { body: payload } = req;
    const data = await userService.loginUser(payload);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

const refreshToken = async (req, res, next) => {
  try {
    const { userId: userId } = req.body;
    const refreshToken = req.refreshToken;
    const data = await userService.refreshToken(refreshToken, userId);
    res.data = data;
    next();
  } catch (error) {
    commonErrorHandler(req, res, error.message, 400, error);
  }
};

module.exports = {
  registration,
  loginUser,
  refreshToken,
};
