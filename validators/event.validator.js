const Joi = require('joi');
const {validateRequest} = require('../helper/common-functions.helper')

const createEventSchema = async (req, res, next) => {
    const schema = Joi.object({
        eventName: Joi.string().min(3).required(),
        eventDuration: Joi.string().min(3).required(),
        eventLanguage: Joi.string().min(3).required(),
        eventDate:Joi.date().iso().required(),
        eventType: Joi.string().valid('concert', 'movie').label('User Type should be [concert,movie] only'),
    });
    validateRequest(req, res, next, schema, 'body');
}



module.exports={
    createEventSchema
}