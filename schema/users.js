import Joi from 'joi';

export const usersRegisterSchema = Joi.object({
    body: Joi.object({
        firstName: Joi.string().min(3).regex(/^[a-z]+$/i).message('Invalid First name!'),
        lastName: Joi.string().min(3).regex(/^[a-z]+$/i).message('Invalid Last name!'),
        birthYear: Joi.date().max('1-1-2005').message('You must be over 18 to enter!'),
        phone: Joi.string().max(30).message('Invalid phone number!'),
        country: Joi.string().min(2).max(30).message('Invalid Country!'),
        city: Joi.string().min(3).max(30).message('Invalid city!'),
        isDevice: Joi.boolean(),
        street: Joi.string().min(3).max(50).message('Invalid street!'),
        postal: Joi.string().min(4).max(6).regex(/^[\d]+$/i).message('Invalid Postal/Zip Code!'),
        email: Joi.string().email().trim().message('Invalid email address - must be within validation rules!'),
        password: Joi.string().min(6).max(30).regex(/^[a-zA-Z0-9_.!@#$%^&*]+$/i)
            .message('Please enter a password that meets our security standards!'),
        status: Joi.string().valid('active', 'deleted', 'pending'),

    }),
    query: Joi.object({
        status: Joi.string().valid('active', 'deleted'),
    }),
});
