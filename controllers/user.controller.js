const { commonErrorHandler } = require('../helper/error-handler');
const userService = require('../services/user.service');

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
}

module.exports={
    registration,loginUser
}

