import jwt from "jsonwebtoken";
import HttpError from "http-errors";
import {Users} from "../models";

const {JWT_SECRET} = process.env;
const EXCLUDE = [
    '/users/login',
    '/users/register',
    '/users/confirm',
    '/users/blockquote',
    '/users/getBlockquote',
    '/users/forget',
    '/users/newPassword',
    '/cart/cart',
    '/cart/cartItem',
    '/products/products',
    '/img'
];

export default async function authorization(req, res, next) {
    try {
        const {path, method} = req;

        if (method === 'OPTIONS' || EXCLUDE.includes(path)) {
            next();
            return;
        }

        const token = req.headers.authorization || req.query.token || '';

        let userId;


        try {
            const data = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
            userId = data.userId;
        } catch (e) {

        }

        if (!userId) {
            throw HttpError(401, 'Invalid token')
        }

        req.userId = userId;
        next();
    } catch (e) {
        next(e);
    }
}

