import {Categories, Like, Products} from '../models';
import path from "path";
import fs from "fs";
import {v4 as uuidV4} from 'uuid';
import imgPromise from "../services/imgPromise";
import sequelize from "../services/sequelize";
import categories from "../routes/categories";
import HttpError from "http-errors";
import _ from 'lodash'
import jwt from "jsonwebtoken";

const {JWT_SECRET} = process.env;


class ProductsController {

    static createProducts = async (req, res, next) => {
        try {
            const {
                title,
                description,
                category,
                oldPrice,
                discount,
                countProduct,
                shop = 'available'
            } = req.body;
            const {file} = req;

            const originalName = file.originalname.replace(/\..+$/, '.jpg');
            const avatar = path.join('/img', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)

            const categoryId = await Categories.findOne({
                where:{
                    type:category
                }
            })

            await Products.create({
                title,
                description,
                categoryId: +categoryId.id,
                oldPrice: +oldPrice,
                newPrice: +discount ? +oldPrice - +oldPrice * +discount / 100 : +oldPrice,
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
            const {title, id, description, category, oldPrice, discount, shop = 'available', countProduct} = req.body;
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


            const categoryId = await Categories.findOne({
                where: {type: category}
            })

            await Products.update(
                {
                    title,
                    id,
                    description,
                    categoryId: +categoryId.id,
                    oldPrice: +oldPrice,
                    newPrice: +discount ? +oldPrice - +oldPrice * +discount / 100 : +oldPrice,
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
        try {
            const {
                filter = '',
                min = 0,
                max = 9999999999,
                page = 1,
                limit = 12,
                searchText = '',
            } = req.query;

            const productPrice = await Products.findAll({
                attributes: [[sequelize.fn('min', sequelize.col('newPrice')), 'minPrice'], [sequelize.fn('max', sequelize.col('newPrice')), 'maxPrice']],
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

            if (searchText) {
                whereOption = {
                    ...whereOption, $or: [
                        {
                            title: {
                                $like: "%" + searchText + "%",
                            },
                        },
                        {
                            description: {
                                $like: "%" + searchText + "%",
                            },
                        },
                    ],
                }
            }


            const product = await Products.findAll({
                include: [{
                    model: Categories,
                    as: 'categories',
                }],
                where: {
                    $and: [{newPrice: {$gte: +min}}, {newPrice: {$lte: +max}},],
                    ...whereOption
                },
                order: [['createdAt', 'desc']],
                offset: (+page - 1) * +limit,
                limit: +limit,
            });

            const total = await Products.count({
                where: {
                    $and: [
                        {newPrice: {$gte: +min}},
                        {newPrice: {$lte: +max}},
                    ],
                    ...whereOption
                },
            });

            const products = product.map(x => x.get({ plain: true }))
            for (const project of products) {
                project.like = await Like.count({
                    where: {
                        productId: project.id
                    }
                })
            }

            res.json({
                status: 'ok',
                products,
                categories,
                productPrice,
                total,
                page,
                totalPages: Math.ceil(total / limit)
            });

        } catch (e) {
            next(e);
        }
    }
    static getProductsAdmin = async (req, res, next) => {
        try {
            const {
                page = 1,
                searchText = '',
            } = req.query;

            let whereOption = {}

            if (searchText) {
                whereOption = {
                    ...whereOption, $or: [
                        {
                            title: {
                                $like: "%" + searchText + "%",
                            },
                        },
                        {
                            description: {
                                $like: "%" + searchText + "%",
                            },
                        },
                    ],
                }
            }


            const product = await Products.findAll({
                include: [{
                    model: Categories,
                    as: 'categories',
                }],
                where: {
                    ...whereOption,
                },
                order: [['createdAt', 'desc']],
                offset: (+page - 1) * 9,
                limit: 9,
            });

            const total = await Products.count({
                where: {
                    ...whereOption
                },
            });

            const products = product.map(x => x.get({ plain: true }))
            for (const project of products) {
                project.like = await Like.count({
                    where: {
                        productId: project.id
                    }
                })
            }

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

    static getSingleProduct = async (req, res, next) => {
        try {
            const {id} = req.query;
            let userId
            try {
                const data = jwt.verify(req.headers.authorization.replace('Bearer ', ''), JWT_SECRET);
                userId = data.userId;
            } catch (e) {
            }

            const product = await Products.findOne({
                include: [{
                    model: Categories,
                    as: 'categories',
                }],
                where: {id: +id},
            });
            let likeCount
            let isLiked
            if (userId) {
                likeCount = await Like.count({where: {productId: id}})
                isLiked = await Like.findOne({where: {productId: id, userId}})
            }
            res.json({
                status: 'ok',
                product,
                likeCount,
                isLiked: !!isLiked
            });

        } catch (e) {
            next(e);
        }
    }
}


export default ProductsController;
