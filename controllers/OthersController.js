import {Cart, CartItem, Categories, Like, Orders, Products, Users} from "../models";
import HttpError from "http-errors";
import {Sequelize} from "sequelize";
import sequelize from "../services/sequelize";

class OthersController {
    static productLike = async (req, res, next) => {
        try {
            const userId = req.userId;
            const {productId} = req.body;

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
    static setOrderStatus = async (req, res, next) => {
        try {
            const {page = 1, id, status } = req.body

            if(status === 'sent'){
                await Orders.update({
                    deliveryStatus: 'pending'
                },{
                    where:{id, deliveryStatus:'sent'},
                });
            }else{
                await Orders.update({
                    deliveryStatus: 'sent'
                },{
                    where:{id, deliveryStatus:'pending'},
                });
            }

            const orders = await Orders.findAll({
                include: [{
                    model: Users,
                    as: 'userOrder',
                }],
                order: [['createdAt', 'desc']],
                offset: (+page - 1) * 9,
                limit: 9
            });

            const total = await Orders.count();

            res.json({
                status: 'ok',
                orders,
                total,
                totalPages: Math.ceil(total / 9)
            });

        } catch (e) {
            next(e);
        }
    }
    static getOrders = async (req, res, next) => {
        try {
            const {page = 1} = req.body
            const orders = await Orders.findAll({
                include: [{
                    model: Users,
                    as: 'userOrder',
                }],
                order: [['createdAt', 'desc']],
                offset: (+page - 1) * 9,
                limit: 9
            });

            const total = await Orders.count();

            res.json({
                status: 'ok',
                orders,
                total,
                totalPages: Math.ceil(total / 9)
            });

        } catch (e) {
            next(e);
        }
    }
    static getSingleOrder = async (req, res, next) => {
        try {
            const {page = 1} = req.body;
            const {userId} = req;
            const orders = await Orders.findAll({
                where:{userId},
                order: [['createdAt', 'desc']],
                offset: (+page - 1) * 9,
                limit: 9
            });

            const total = await Orders.count({where:{userId}});

            res.json({
                status: 'ok',
                orders,
                total,
                totalPages: Math.ceil(total / 9)
            });

        } catch (e) {
            next(e);
        }
    }
}

export default OthersController
