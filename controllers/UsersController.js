import {Users} from "../models";
import HttpError from "http-errors";
import {v4 as uuidV4} from "uuid";
import Email from "../services/Email";
import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env;
class UsersController {

    static register = async (req, res, next) => {
        try {
            const {
                firstName, lastName, birthYear, email, password,
                redirectUrl = 'http://localhost:4000/users/confirm'
            } = req.body;


            console.log(req.body)
            const existUser = await Users.findOne({
                where:{email}
            })

            if(existUser){
                throw HttpError(401, "User exists")
            }
            const confirmToken = uuidV4();

            const user = await Users.create({
                firstName, lastName, birthYear, email, password, confirmToken
            });

            await Email.sendActivationEmail(email, confirmToken, redirectUrl);

           res.json({
               status:'ok',
               user
           })

        } catch (e) {
            next(e);
        }
    }

    static confirm = async (req, res, next) => {
        try {
            const {email, token} = req.query;

            const user = await Users.findOne({
                where:{email}
            });

            if (user.confirmToken !== token) {
                throw HttpError(403);
            }

            await Users.update(
                {
                    confirmToken: null,
                    status:'active'
                },
                {
                    where: { email },
                }
            );


            res.json({
                status: 'ok',
                email
            })
        } catch (e) {
            next(e);
        }
    }

    static list = async (req, res, next) => {
        try {

            const user = await Users.findAll()

            res.json({
                status: 'ok',
                user
            })
        } catch (e) {
            next(e);
        }
    }

    static forgetPass = async (req, res, next) => {
        try {
            const {email} = req.body;
            console.log(email)
            const user = await Users.findOne({
                where: {email}
            });

            if (!user)  {
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
                throw HttpError(403);
            }

            if(user.status !== "active"){
                throw HttpError(403, "You haven't confirmed your account");
            }
            const token = jwt.sign({ userId: user.id }, JWT_SECRET);

            res.json({
                status: 'ok',
                token,
                user
            });

        } catch (e) {
            next(e)
        }
    }


}

export default UsersController
