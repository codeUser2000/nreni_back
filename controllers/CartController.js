import {Cart, CartItem, Categories, Products, Users} from "../models";
import HttpError from "http-errors";

class CartController {
    static cart = async (req, res, next) => {
        try {
            console.log(req.body)
            const {userId} = req.query;

            const user = Users.findOne({
                where: {id: userId}
            })
            if (!user) {
                throw HttpError(403, 'There is no such user');
            }
            const cart = await Cart.create({
                userId
            });

            res.json({
                status: 'ok',
               // cart
            })
        } catch (e) {
            next(e);
        }
    }

    static addToCart = async (req, res, next) => {
        try {
            const {cartId, productId, price, quantity, status = 'unsold'} = req.body;

            const product = await Products.findOne({
                where: {id: productId}
            });

            if (!product) {
                throw HttpError(403, 'There is no such product');
            }

            const cartItem = await CartItem.create({
                cartId, productId, price, quantity, status
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


    static deleteFromCart = async (req, res, next) => {
        try {
            const {id} = req.body;

            const cartItem = await Users.findOne({
                where: {id}
            });

            if (!cartItem) {
                throw HttpError(403, 'There is no such item');
            }


            await cartItem.destroy()

            res.json({
                status: 'ok'
            })
        } catch (e) {
            next(e)
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


    static cartItemList = async (req, res, next) => {
        try {
            const {
                page = 1, limit = 5
            } = req.query;

            const {cartId} = req.query;


            const cartItem = await CartItem.findAll({
                include: [{
                    model: Products,
                    as: 'product',
                }],
                where: {id: cartId},
                order: [['createdAt', 'desc']],
                offset: (+page - 1) * +limit,
                limit: +limit
            })

            const total = await CartItem.count();
            res.json({
                status: 'ok',
                cartItem,
                total,
                totalPages: Math.ceil(total / limit)
            })
        } catch (e) {
            next(e);
        }
    }


}

export default CartController;
