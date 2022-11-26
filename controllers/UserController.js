import {Users} from "../models";
import HttpError from "http-errors";
import {v4 as uuidV4} from "uuid";
import Email from "../services/Email";


class UserController {
    static register = async (req, res, next) => {
        try {
            const {
                firstName, lastName, birthYear, email, password,
                redirectUrl = 'http://localhost:4000/users/confirm'
            } = req.body;


            const confirmToken = uuidV4();

            await Email.sendActivationEmail(email, confirmToken, redirectUrl);

            const user = await Users.create({
                firstName, lastName, birthYear, email, password,
            });

            res.json({
                status: 'ok',
                confirmToken,
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


            res.json({
                status: 'ok',
                user,
            })

        } catch (e) {
            next(e)
        }
    }

}

export default UserController
