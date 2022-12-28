import {Blockquote, Categories, Products, Users} from "../models";
import HttpError from "http-errors";
import {v4 as uuidV4} from "uuid";
import Email from "../services/Email";
import jwt from "jsonwebtoken";

const {JWT_SECRET, FRONT_URL} = process.env;

class UsersController {
    static register = async (req, res, next) => {
        try {
            const {
                firstName, lastName, birthYear, email, password, phone,
                redirectUrl = 'http://localhost:4000/users/confirm'
            } = req.body;

            const existUser = await Users.findOne({
                where: {email}
            })

            if (existUser) {
                throw HttpError(401, "User exists")
            }
            const confirmToken = uuidV4();

            const user = await Users.create({
                firstName, lastName, birthYear, email, password, confirmToken, phone
            });

            await Email.sendActivationEmail(email, confirmToken, redirectUrl);

            res.json({
                status: 'ok',
                user
            })

        } catch (e) {
            next(e);
        }
    }

    static confirm = async (req, res, next) => {
        try {
            const {email, token} = req.body;

            const user = await Users.findOne({
                where: {email}
            });

            if (user.confirmToken !== token) {
                throw HttpError(403);
            }

            await Users.update(
                {
                    confirmToken: null,
                    status: 'active'
                },
                {
                    where: {email},
                }
            );


            res.json({
                status:'ok'
        })

        } catch (e) {
            next(e);
        }
    }

    static list = async (req, res, next) => {
        try {
            const {
                page = 1, limit = 9
            } = req.query;

            const user = await Users.findAll({
                order: [['createdAt', 'desc']],
                offset: (+page - 1) * +limit,
                limit: +limit
            });

            const total = await Users.count();
            res.json({
                status: 'ok',
                user,
                total,
                totalPages: Math.ceil(total / limit)
            })
        } catch (e) {
            next(e);
        }
    }

    static forgetPass = async (req, res, next) => {
        try {
            const {email} = req.body;
            const user = await Users.findOne({
                where: {email}
            });

            if (!user) {
                throw HttpError(403, "We dont have such user");
            }

            await Email.sendDropPassword(email);

            res.json({
                status: 'ok',
                email
            })
        } catch (e) {
            next(e);
        }
    }

    static login = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({
                where: {email}
            });

            if (!user || user.getDataValue('password') !== Users.passwordHash(password)) {
                throw HttpError(403, "Password or login is wrong");
            }

            if (user.status !== "active") {
                throw HttpError(403, "You haven't confirmed your account");
            }
            const token = jwt.sign({userId: user.id}, JWT_SECRET);

            res.json({
                status: 'ok',
                token,
                user
            });

        } catch (e) {
            next(e)
        }
    }

    static newPassword = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({
                where: {email}
            });

            if (!user) {
                throw HttpError(403);
            }

            await Users.update(
                {
                    password
                },
                {
                    where: {email},
                }
            );

            res.json({
                status: 'ok',
                user
            });

        } catch (e) {
            next(e)
        }
    }

    static userSelfDelete = async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await Users.findOne({
                where: {email}
            });

            if (!user) {
                throw HttpError(403, 'There is no such user');
            }


            await user.destroy()

            res.json({
                status: 'ok',
            });

        } catch (e) {
            next(e);
        }
    }

    static adminLogin = async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const admin = await Users.findOne({
                where: {email, admin: true}
            });

            if (!admin || admin.getDataValue('password') !== Users.passwordHash(password)) {
                throw HttpError(403, "You are not admin");
            }

            const token = jwt.sign({userId: admin.id}, JWT_SECRET);

            res.json({
                status: 'ok',
                token,
                admin
            });

        } catch (e) {
            next(e)
        }
    }

    static delete = async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await Users.findOne({
                where: {email}
            });

            if (!user) {
                throw HttpError(403, 'There is no such user');
            }


            await user.destroy()

            res.json({
                status: 'ok',
            });

        } catch (e) {
            next(e);
        }
    }

    static blockquote = async (req, res, next) => {
        try {
            const {firstName, lastName, message} = req.body;

            const quote = await Blockquote.create({
                firstName, lastName, message
            });

            res.json({
                status: 'ok',
                quote,
            });

        } catch (e) {
            next(e);
        }
    }

    static deleteBlockquote = async (req, res, next) => {
        try {
            const {id} = req.body;

            const blockquote = await Blockquote.findOne({
                where: {id}
            });

            if (!blockquote) {
                throw HttpError(403, 'There is no such blockquote');
            }


            await blockquote.destroy()

            const blockquotes = await Blockquote.findAll({
                order: [['createdAt', 'desc']],
                limit: 9,
            })
            const total = await Blockquote.count();

            res.json({
                status: 'ok',
                blockquotes,
                total,
                totalPages: Math.ceil(total / 9)
            });

        } catch (e) {
            next(e);
        }
    }

    static getBlockquote = async (req, res, next) => {
        try {

            const quote = await Blockquote.findAll({
                limit: 10,
                order: [['createdAt', 'desc']],
            });

            res.json({
                status: 'ok',
                quote,
            });

        } catch (e) {
            next(e);
        }
    }

}

export default UsersController
