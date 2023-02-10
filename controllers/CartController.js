import {Cart, CartItem, Products, Users} from "../models";
import HttpError from "http-errors";

class CartController {
    static addToCart = async (req, res, next) => {
        try {
            const {productId, price, quantity, status = 'unsold'} = req.body;
            const product = await Products.findOne({
                where: {id: productId}
            });


            const {userId} = req


            const user = await Cart.findOne({
                include: [{
                    model: Users,
                    as: 'user',
                }],
                where: {userId}
            })


            if (!product) {
                throw HttpError(403, 'There is no such product');
            }

            console.log(user)
            if (user.user.status !== 'active') {
                throw HttpError(403, 'User Should be activated');
            }

            const existProduct = await CartItem.findOne({
                where: {productId}
            })

            let cartItem;


            if (existProduct) {
                console.log('if')

                if (+existProduct.quantity + +quantity > +product.countProduct) {
                    throw HttpError(403, 'There is no such count of this product');
                }
                await CartItem.update(
                    {
                        quantity: +existProduct.quantity + +quantity,
                        price: +existProduct.newPrice + +price
                    },
                    {
                        where:
                            {productId, cartId: user.id},
                    }
                )
            } else {
                console.log('else')
                const cart = await Cart.findOne({
                    where: {userId}
                })

                await CartItem.create({
                    cartId: cart.id, productId, price, quantity, status
                });
            }
            res.json({
                status: 'ok',
                user,
                existProduct
            })
        } catch (e) {
            next(e);
        }
    }

    static deleteFromCart = async (req, res, next) => {
        try {
            const {productId, cartId} = req.body;

            const cartItem = await CartItem.findOne({
                where: {
                    id: productId,
                    cartId
                }
            });

            if (!cartItem) {
                throw HttpError(403, 'There is no such item');
            }

            await cartItem.destroy()

            res.json({
                status: 'ok',
                cartItem
            })
        } catch (e) {
            next(e)
        }
    }

    static getCartItem = async (req, res, next) => {
        const {
            page = 1,
        } = req.query;

        try {
            const cartItem = await CartItem.findAll(
                {
                    include: [{
                        model: Products,
                        as: 'product',
                    }, {
                        model: Cart,
                        as: 'carts',
                        include: {
                            model: Users,
                            as: 'user'
                        }
                    }],
                    order: [['createdAt', 'desc']],
                    offset: (+page - 1) * 10,
                    limit: 10
                }
            )
            const total = await CartItem.count();
            res.json({
                status: 'ok',
                cartItem,
                total,
                totalPages: Math.ceil(total / 10)
            })
        } catch (e) {
            next(e);
        }
    }

    static updateCartItem = async (req, res, next) => {
        const {
            productId,
            count,
            price
        } = req.body;
        try {
            const {userId} = req
            const cartId = await Cart.findOne({
                where: {userId}
            })
            await CartItem.update({
                quantity: count,
                price: price * count
            }, {
                where: {productId, cartId: cartId.id}
            })
            res.json({
                status: 'ok',
            })
        } catch (e) {
            next(e);
        }
    }

    static cartItemList = async (req, res, next) => {
        try {
            const {
                page = 1, limit = 10
            } = req.query;

            const {userId} = req;
            const cartId = await Cart.findOne({
                where: {userId}
            })
            const cartItem = await CartItem.findAll({
                include: [{
                    model: Products,
                    as: 'product',
                }],
                where: {cartId: cartId.id},
                order: [['createdAt', 'desc']],
                offset: (+page - 1) * +limit,
                limit: +limit
            })

            const total = await CartItem.count({
                where: {cartId: cartId.id}
            });
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

    static addToCartFromLocalStorage = async (req, res, next) => {
        try {
            const {userId} = req
            const {data, status = 'unsold'} = req.body;

            const user = await Cart.findOne({
                include: [{
                    model: Users,
                    as: 'user',
                }],
                where: {userId}
            })
            if (user.user.status !== 'active') {
                throw HttpError(403, 'User Should be activated');
            }
            const cart = await Cart.findOne({
                where: {userId}
            })
            data.map(async (c) => {
                await CartItem.create({
                    cartId: cart.id, productId: c.product.id, price: c.price, quantity: c.quantity, status
                });
            })

            res.json({
                status: 'ok',
            })
        } catch (e) {
            next(e);
        }
    }

}

export default CartController;
