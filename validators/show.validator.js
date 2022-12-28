const Joi = require('joi');
const {validateRequest} = require('../helper/common-functions.helper')

const getShowTypeSchema = async (req, res, next) => {
    const schema = Joi.object({
        eventId: Joi.string().uuid().required()
    });
    validateRequest(req, res, next, schema, 'body');
}



module.exports={
    getShowTypeSchema
}