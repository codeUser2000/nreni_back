import {Categories, Products, Users} from '../models';
import path from "path";
import {v4 as uuidV4} from 'uuid';
import imgPromise from "../services/imgPromise";
import sequelize from "../services/sequelize";
import categories from "../routes/categories";
import HttpError from "http-errors";


class ProductsController {

    static createProducts = async (req, res, next) => {
        try {
            const {title, description, categoryId, price, discount, shop = 'available'} = req.body;
            const {file} = req;

            console.log(req.body,req.file)
            const originalName = file.originalname.replace(/\..+$/, '.jpg');
            const avatar = path.join('/img', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)

            const product = await Products.create({
                title, description, categoryId:+categoryId, price:+price, discount:+discount, shop, avatar
            });

            res.json({
                status: 'ok ',
                product,
            })
        } catch (e) {
            next(e);
        }
    }

    static update = async (req, res, next) => {
        try {
            const {id, data} = req.body;
            const product = await Products.findOne({
                where: {id}
            });

            if (!product) {
                throw HttpError(403);
            }

            await Products.update(
                data,
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
                // include:[{
                //     model:TranslateData,
                //     as: 'translation',
                //     // where:
                // }],
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
