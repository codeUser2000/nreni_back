import jwt from "jsonwebtoken";
import HttpError from "http-errors";
import {Users} from "../models";
import _ from 'lodash'
const {JWT_SECRET} = process.env;
const EXCLUDE = [
    '/admin/login'
];

export default async function adminAuth(req, res, next) {
    try {
        const {path, method} = req;
        if (method === 'OPTIONS' || EXCLUDE.includes(path)) {
            next();
            return;
        }
        const token = req.headers.authorization || req.query.token || '';
        let admin;
        try {
            const data = jwt.verify(token.replace('Bearer ', ''), JWT_SECRET);
            admin = await Users.findOne({
                where:{
                    id:+data.userId,
                    admin:true
                }
            });
            console.log(admin)
        } catch (e) {}


        if (_.isEmpty(admin)) {
            throw HttpError(401, 'Invalid admin token')
        }
        // if (admin) {
        //     throw HttpError(401, JSON.stringify(admin))
        // }
        req.admin = admin;
        next();
    } catch (e) {
        next(e);
    }
}

