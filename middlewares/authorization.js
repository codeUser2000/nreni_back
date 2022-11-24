import jwt from "jsonwebtoken";
import HttpError from "http-errors";

const EXCLUDE = [
    '/users/login',
    '/users/register',
    '/users/confirm',
]
const {JWT_SECRET} = process.env;

export default function authorization(req, res, next) {
    try {
        const {path, method} = req

        if (method === 'OPTIONS' || EXCLUDE.includes(path)) {
            next();
            return;
        }

        const token = req.headers.authorization || req.query.token || 'hrllo';

        const {email} = jwt.verify(token.replace('Bearer ', ''), '#$%EDRTYFGHV');

        if (!email) {
            throw HttpError(401, 'Invalid token')
        }

        req.email = email;

        next();
    } catch (e) {
        next(e);
    }
}

