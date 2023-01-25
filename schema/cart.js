import Joi from 'joi';

export const cartSchema = Joi.object({
    body: Joi.object({
        cartName: Joi.string().min(3).regex(/^[a-z]+$/i).message('Invalid Cart Name!'),
        expireDate: Joi.date().message('You!'),
        cvv: Joi.string().min(3).max(3).regex(/^[\d]+$/i).message('Invalid CVV!'),
    }),
    query: Joi.object({
        status: Joi.string().valid('active', 'deleted'),
    }),
});
