const models = require('../models');
const { sequelize } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registration = async (payload) => { 
   
    try {
        const existingUser = await models.User.findOne({
      where: { email: payload.email },
    });
    if (existingUser) {
      throw new Error("User already exists");
    }

    payload.password = await bcrypt.hash(payload.password, 10)
    const data = await models.User.create(payload);
    return "user created successufully";
        
    } catch (error) {
        return { data: null, error: error };
    }
    
}

const loginUser = async (payload) => {
    const { email, password } = payload;


    const user = await models.User.findOne({
        where: {
            email: email
        }
    });

    if (!user) {
        throw new Error('User Not Found!');
    }

    const match = await bcrypt.compare(password, user.dataValues.password);
    if (!match) {
        throw new Error('Wrong credentials');
    }

    const accessToken = jwt.sign({ userId: user.dataValues.id }, process.env.SECRET_KEY_ACCESS,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRATION
        }
    );
    const refreshToken = jwt.sign({ userId: user.dataValues.id }, process.env.SECRET_KEY_REFRESH,
        {
            expiresIn: process.env.JWT_REFRESH_EXPIRATION
        }
    );

    delete user.dataValues.password;

    return {
        id: user.id,
        email: user.email,
        accessToken: accessToken,
        refreshToken: refreshToken,
    }
}

const refreshToken = async (refreshToken, userId) => {
    let newAccessToken = jwt.sign({ userId: userId }, process.env.SECRET_KEY_ACCESS, {
      expiresIn: process.env.JWT_ACCESS_EXPIRATION
    });
  
    return {
      accessToken: newAccessToken,
      refreshToken,
    }
  }

module.exports = {
    registration,loginUser,refreshToken
}