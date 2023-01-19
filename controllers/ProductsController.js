import {Categories, Like, Products} from '../models';
import path from "path";
import fs from "fs";
import {v4 as uuidV4} from 'uuid';
import imgPromise from "../services/imgPromise";
import sequelize from "../services/sequelize";
import categories from "../routes/categories";
import HttpError from "http-errors";
import _ from 'lodash'
import {Sequelize} from "sequelize";

class ProductsController {

    static createProducts = async (req, res, next) => {
        try {
            const {title, description, categoryId, price, discount, countProduct, shop = 'available'} = req.body;
            const {file} = req;

            const originalName = file.originalname.replace(/\..+$/, '.jpg');
            const avatar = path.join('/img', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)

            await Products.create({
                title,
                description,
                categoryId: +categoryId,
                price: +price,
                discount: +discount,
                shop,
                avatar,
                countProduct
            });

            const products = await Products.findAll({
                include: [{
                    model: Categories,
                    as: 'categories',
                }],
                order: [['createdAt', 'desc']],
                limit: 9,
            })

            const total = await Products.count();

            res.json({
                status: 'ok ',
                products,
                total,
                totalPages: Math.ceil(total / 9)
            })
        } catch (e) {
            next(e);
        }
    }

    static update = async (req, res, next) => {
        try {
            const {title, id, description, categoryId, price, discount, shop = 'available', countProduct} = req.body;
            const {file} = req;
            const product = await Products.findOne({
                where: {id}
            });


            if (!product) {
                throw HttpError(403, 'There is no such product!');
            }
            let avatar;
            if (!_.isEmpty(file)) {
                const oldFile = path.join(__dirname, '../public', product.avatar)
                if (fs.existsSync(oldFile)) {
                    fs.unlinkSync(oldFile)
                }
                const originalName = file.originalname.replace(/\..+$/, '.jpg');
                avatar = path.join('/img', uuidV4() + '-' + originalName);
                await imgPromise('../public', file, avatar)
            }


            await Products.update(
                {
                    title,
                    id,
                    description,
                    categoryId,
                    price,
                    countProduct,
                    discount,
                    avatar: avatar ? avatar : product.avatar
                },
                {
                    where: {id},
                }
            );


            const products = await Products.findAll({
                include: [{
                    model: Categories,
                    as: 'categories',
                }],
                order: [['createdAt', 'desc']],
                limit: 9,
            })
            const total = await Products.count();
            res.json({
                status: 'ok',
                products,
                total,
                totalPages: Math.ceil(total / 9)
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
            if (fs.existsSync(file)) {
                fs.unlinkSync(file)
            }
            await product.destroy()

            const products = await Products.findAll({
                include: [{
                    model: Categories,
                    as: 'categories',
                }],
                order: [['createdAt', 'desc']],
                limit: 9,
            })
            const total = await Products.count({
                where: {}
            });

            res.json({
                status: 'ok',
                products,
                total,
                totalPages: Math.ceil(total / 9)
            });

        } catch (e) {
            next(e);
        }
    }


    static getProducts = async (req, res, next) => {
        console.log(req.userId)
        try {
            const {
                lang = 'en',
                filter = '',
                min = 0,
                max = 9999999999,
                page = 1,
                limit = 9
            } = req.query;

            const productPrice = await Products.findAll({
                attributes: [[sequelize.fn('min', sequelize.col('price')), 'minPrice'], [sequelize.fn('max', sequelize.col('price')), 'maxPrice']],
                raw: true,
            })
            const categories = await Categories.findAll({
                where: {
                    type: {
                        $in: filter.split(',')
                    }
                }
            })
            let whereOption = {}
            const categoryArrId = []
            if (filter) {
                categories.map((c) => {
                    categoryArrId.push(c.id)
                })
                whereOption = {categoryId: categoryArrId}
            }


            const product = await Products.findAll({
                include: [{
                    model: Categories,
                    as: 'categories',
                }, {
                    model: Like,
                    as: 'likeCount',
                    attributes: [[sequelize.fn("COUNT",sequelize.col("productId")), "productLike"]],
                    separate : true,
                    group: ["id"],

                },],

                where: {
                    $and: [{price: {$gte: +min}}, {price: {$lte: +max}},],
                    ...whereOption
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
                    ...whereOption
                },
            });

            res.json({
                status: 'ok',
                product,
                categories,
                productPrice,
                total,
                totalPages: Math.ceil(total / limit)
            });

        } catch (e) {
            next(e);
        }
    }

    static getSingleProduct = async (req, res, next) => {
        try {
            const {id} = req.query;
            const product = await Products.findOne({
                include: [{
                    model: Categories,
                    as: 'categories',
                }],
                where: {id: +id},
            });

            res.json({
                status: 'ok',
                product,
            });

        } catch (e) {
            next(e);
        }
    }
}


export default ProductsController;
