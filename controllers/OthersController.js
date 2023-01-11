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
            const user = req.headers.authorization;
            const productId = req.body;


            if (user === false) {
                throw HttpError(403, 'There is no such user. If you want like product, please, register');
            }

            const product = await Like.findOne({
                where: {productId},
            })

            if (!product) {
                throw HttpError(403, 'There is no such product.');

            }
            const total = await Like.count(
                {
                    where: {productId},
                }
            );

            res.json({
                status: 'ok',
            })
        } catch (e) {
            next(e);
        }
    }
    static likeCount = async (req, res, next) => {
        try {
            const productId = req.body;

        } catch (e) {
            next(e);
        }
    }
}

export default OthersController
