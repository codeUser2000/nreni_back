import {Categories, Products, Users} from '../models';
import path from "path";
import fs from "fs";
import {v4 as uuidV4} from 'uuid';
import imgPromise from "../services/imgPromise";
import sequelize from "../services/sequelize";
import categories from "../routes/categories";
import HttpError from "http-errors";
import _ from 'lodash'

class ProductsController {

    static createProducts = async (req, res, next) => {
        try {
            const {title, description, categoryId, price, discount, shop = 'available'} = req.body;
            const {file} = req;

            const originalName = file.originalname.replace(/\..+$/, '.jpg');
            const avatar = path.join('/img', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)
            await Products.create({
                title, description, categoryId: +categoryId, price: +price, discount: +discount, shop, avatar
            });

            const products = Products.findAll({
                include: [{
                    model: Categories,
                    as: 'categories',
                }],
                order: [['createdAt', 'desc']],
                limit: 9,
            })

            res.json({
                status: 'ok ',
                products,
            })
        } catch (e) {
            next(e);
        }
    }

    static update = async (req, res, next) => {
        try {
            const {title, id, description, categoryId, price, discount, shop = 'available'} = req.body;
            const {file} = req;
            console.log(file, 3456788987784567)
            const product = await Products.findOne({
                where: {id}
            });

            if (!product) {
                throw HttpError(403);
            }
            let avatar;
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', product.avatar)
                fs.unlinkSync(oldFile)
                const originalName = file.originalname.replace(/\..+$/, '.jpg');
                avatar = path.join('/img', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
            }


            await Products.update(
                {title, id, description, categoryId, price, discount, avatar: avatar ? avatar : product.avatar},
                {
                    where: {id},
                }
            );

            res.json({
                status: 'ok',
                product
            });

        } catch (e) {
            next(e)
        }
    }

    static delete = async (req, res, next) => {
        try {
            const {id} = req.body;

            const product = await Products.findOne({
                where: {id}
            });

            if (!product) {
                throw HttpError(403, 'There is no such user');
            }

            const file = path.join(__dirname, '../public', product.avatar)
            fs.unlinkSync(file)

            await product.destroy()

            res.json({
                status: 'ok',
            });

        } catch (e) {
            next(e);
        }
    }

    static getProducts = async (req, res, next) => {
        try {
            const {
                lang = 'en',
                query = '',
                category = [],
                min = 0,
                max = 9999999999,
                page = 1,
                limit = 9
            } = req.query;
            const productPrice = await Products.findAll({
                attributes: [[sequelize.fn('min', sequelize.col('price')), 'minPrice'], [sequelize.fn('max', sequelize.col('price')), 'maxPrice']],
                raw: true,
            })
            const product = await Products.findAll({
                include: [{
                    model: Categories,
                    as: 'categories',
                }],

                where: {
                    $or: [{
                        $and: [{price: {$gte: +min}}, {price: {$lte: +max}},]
                    },
                    ]

                },
                order: [['createdAt', 'desc']],
                offset: (+page - 1) * +limit,
                limit: +limit
            });

            const total = await Products.count({
                where: {
                    $and: [
                        {price: {$gte: +min}},
                        {price: {$lte: +max}},
                    ],
                },
            });

            res.json({
                status: 'ok',
                product,
                productPrice,
                total,
                totalPages: Math.ceil(total / limit)
            });

        } catch (e) {
            next(e);
        }
    }
}


export default ProductsController;
