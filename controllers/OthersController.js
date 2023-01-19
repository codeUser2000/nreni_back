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
    static getLike = async (req, res, next) => {
        try {
            const {productId} = req.body;
            const like = Like.findAll({
                attributes: {
                    include: [[Sequelize.fn("COUNT",Sequelize.col("like.id")), "likesCount"]]
                },
            })
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
