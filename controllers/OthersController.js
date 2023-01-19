import {Cart, CartItem, Like, Products, Users} from "../models";
import HttpError from "http-errors";
import {Sequelize} from "sequelize";

class OthersController {
    static productLike = async (req, res, next) => {
        try {
            const userId = req.userId;
            const {productId} = req.body;

            console.log(userId,productId)
            if (userId === false) {
                throw HttpError(403, 'There is no such user. If you want like product, please, register');
            }

            await Like.create({userId, productId});

            res.json({
                status: 'ok',
            })
        } catch (e) {
            next(e);
        }
    }
    static productDeleteLike = async (req, res, next) => {
        try {
            const {productId} = req.body;
            const userId = req.userId;

            const like = await Like.findOne({
                where: {productId, userId}
            })

            await like.destroy();
            res.json({
                status: 'ok',
                like,
            })

        } catch (e) {
            next(e);
        }
    }
}

export default OthersController
