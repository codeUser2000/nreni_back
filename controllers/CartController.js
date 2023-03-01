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

            if (user.user.status !== 'active') {
                throw HttpError(403, 'User Should be activated');
            }

            const existProduct = await CartItem.findOne({
                where: {productId, cartId: user.id, status: 'unsold'}
            })

            let cartItem;


            if (existProduct) {
                ('if')

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
            const {productId} = req.body;

            const {userId} = req

            const cartId = await Cart.findOne({
                where: {
                    userId
                }
            });

            const cartItem = await CartItem.findOne({
                where: {
                    id: productId,
                    cartId:cartId.id
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
                where: {cartId: cartId.id, status: 'unsold'},
                order: [['createdAt', 'desc']],
                offset: (+page - 1) * +limit,
                limit: +limit
            })

            const total = await CartItem.count({
                where: {cartId: cartId.id, status: 'unsold'}
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

            let dataIdArr = [];

            data.map((d) => {
                dataIdArr.push(d.product.id)
            })

            const isExist = await CartItem.findAll({
                where: {productId: dataIdArr, status: 'unsold'},
                order: [['createdAt', 'desc']],
            })

            if (isExist.length) {
                const cartItem = await CartItem.findAll({
                    where: {cartId: cart.id, status: 'unsold'},
                    order: [['createdAt', 'desc']],
                })
                for (let i = 0; i < cartItem.length; i++) {
                    for (let j = 0; j < data.length; j++) {
                        if (cartItem[i].productId === data[j].product.id) {
                            await CartItem.update(
                                {
                                    quantity: +cartItem[i].quantity + +data[j].quantity,
                                    price: +cartItem[i].price + +data[j].price
                                },
                                {
                                    where: {id: +cartItem[i].id, status: 'unsold'}
                                })
                        }
                    }
                }
            } else {
                data.map(async (c) => {
                    await CartItem.create({
                        cartId: cart.id, productId: c.product.id, price: c.price, quantity: c.quantity, status
                    });
                })
            }


            res.json({
                status: 'ok',
                isExist
            })
        } catch (e) {
            next(e);
        }
    }

    // static getCartItem = async (req, res, next) => {
    //     const {
    //         page = 1,
    //     } = req.query;
    //
    //     try {
    //         const cartItem = await CartItem.findAll(
    //             {
    //                 where:{
    //                     status: 'unsold'
    //                 },
    //                 include: [{
    //                     model: Products,
    //                     as: 'product',
    //                 }, {
    //                     model: Cart,
    //                     as: 'carts',
    //                     include: {
    //                         model: Users,
    //                         as: 'user'
    //                     }
    //                 }],
    //                 order: [['createdAt', 'desc']],
    //                 offset: (+page - 1) * 10,
    //                 limit: 10
    //             }
    //         )
    //         const total = await CartItem.count();
    //         res.json({
    //             status: 'ok',
    //             cartItem,
    //             total,
    //             totalPages: Math.ceil(total / 10)
    //         })
    //     } catch (e) {
    //         next(e);
    //     }
    // }

}

export default CartController;
