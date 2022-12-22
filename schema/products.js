import Joi from 'joi';

export const createProductSchema = Joi.object({
    body: Joi.object({
        title: Joi.string().min(4).regex(/^[a-z]+$/i).message('Invalid Product Name'),
        description: Joi.string().min(3).regex(/^[a-z]+$/i).message('Invalid Product Description'),
        price: Joi.number().message('Must be numbers'),
        discount: Joi.number().message('Must be numbers'),
    }),
    query: Joi.object({
        status: Joi.string().valid('active', 'deleted'),
    }),
});
