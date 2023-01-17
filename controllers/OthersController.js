import { Like, } from "../models";
import HttpError from "http-errors";

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
    static likeCount = async (req, res, next) => {
        try {
            const {productId} = req.body;

        } catch (e) {
            next(e);
        }
    }
}

export default OthersController
