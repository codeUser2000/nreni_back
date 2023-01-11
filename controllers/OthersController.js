import {Cart, CartItem, Like, Menu, Products, Users} from "../models";
import HttpError from "http-errors";

class OthersController {
    static getMenu = async (req, res, next) => {
        try {
            const menu = await Menu.findAll();
            res.json({
                status: 'ok',
                menu
            })
        } catch (e) {
            next(e)
        }
    }
    static productLike = async (req, res, next) => {
        try {
            const userId = req.userId;
            const {productId} = req.body;

            if (userId === false) {
                throw HttpError(403, 'There is no such user. If you want like product, please, register');
            }

            await Like.create({userId, productId})

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
