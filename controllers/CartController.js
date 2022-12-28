import {Cart, CartItem, Products, Users} from "../models";
import HttpError from "http-errors";
import cartItems from "../models/CartItems";

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
            const {cartId, productId, title, description, price, quantity, status} = req.query;
            const {id} = req.query;

            const product = await Products.findOne({
                where: {id}
            });

            if (!product) {
                throw HttpError(403, 'There is no such product');
            }

            const cartItem = await CartItem.create({
                cartId, productId, title, description, price, quantity, status
            });
            console.log(cartItem)
            res.json({
                status: 'ok',
                cartItem,
            })
        } catch (e) {
            next(e);
        }
    }

    static createCartItem = async (req, res, next) => {
        try {
            const {cartId, productId, title, description, price, quantity, status} = req.query;
            const {id} = req.query;

            const product = await Products.findOne({
                where: {id}
            });

            if (!product) {
                throw HttpError(403, 'There is no such product');
            }

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



    // static  cartList = async (req, res, next) => {
    //     try {
    //         const {
    //             page = 1, limit = 9
    //         } = req.query;
    //
    //         const cart = await Cart.findAll({
    //             offset: (+page - 1) * +limit,
    //             limit: +limit
    //         });
    //
    //         const total = await Cart.count();
    //         res.json({
    //             status: 'ok',
    //             cart,
    //             total,
    //             totalPages: Math.ceil(total / limit)
    //         })
    //
    //     }catch (e){
    //         next(e)
    //     }
    // }

}

export default CartController;
