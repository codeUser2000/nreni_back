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
            const user = await Users.create({
                firstName, lastName, birthYear, email, password,
            });

            const confirmToken = uuidV4();

            await Email.sendActivationEmail(email, confirmToken, redirectUrl);

            res.json({
                status: 'ok',
                user,
            });

        } catch (e) {
            next(e);
        }
    }

    static confirm = async (req, res, next) => {
        try {
            const {email, token} = req.query;

            const user = await Users.get(email);

            if (user.confirmToken !== token) {
                throw HttpError(403);
            }

            await Users.activate(email);


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
