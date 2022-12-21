import {Cart, CartItem, Products} from "../models";
import HttpError from "http-errors";

class CartController {
    static cart = async (req, res, next) => {
        try {
            const {userId, firstName, lastName, email} = req.query;

            const cart = await Cart.create({
                userId, firstName, lastName, email
            });

            res.json({
                status: 'ok',
                cart
            })
        } catch (e) {
            next(e);
        }
    }

    static cartItem = async (req, res, next) => {
        try {
            const {cartId, productId, title, description, price, quantity, status} = req.body;
            // const {id} = req.query;
            //
            // const product = await Products.findOne({
            //     where: {id}
            // });
            //
            // if (!product) {
            //     throw HttpError(403, 'There is no such product');
            // }

            const cartItem = await CartItem.create({
                cartId, productId, title, description, price, quantity, status
            });

            res.json({
                status: 'ok',
                cartItem,
            })
        } catch (e) {
            next(e);
        }
    }

    static getCartItem = async (req, res, next) => {
        try {
            const cartItem = await CartItem.findAll({
                limit: 10,
            })

            res.json({
                status: 'ok',
                cartItem,
            })
        } catch (e) {
            next(e);
        }
    }

    static deleteCartItem = async (req, res, next) => {
        try {
            const {id} = req.body;

            const cartItem = await CartItem.findOne({
                where: {id}
            })

            await cartItem.destroy();

        } catch (e) {
            next(e);
        }
    }
}

export default CartController;
