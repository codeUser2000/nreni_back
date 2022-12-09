import {Categories, Products} from '../models';
import path from "path";
import {v4 as uuidV4} from 'uuid';
import imgPromise from "../services/imgPromise";


class ProductsController {

    static createProducts = async (req, res, next) => {
        try {
            const {title, description, categoryId, price, discount, shop} = req.body;
            const {file} = req;

            const originalName = file.originalname.replace(/\..+$/, '.jpg');
            console.log()
            const avatar = path.join('/img', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)

            const product = await Products.create({
                title, description, categoryId, price, discount, shop, avatar
            });

            res.json({
                status: 'ok ',
                product
            })
        } catch (e) {
            next(e);
        }
    }
    static getProducts = async (req, res, next) => {
        try {
            const {lang = 'en', page = 1, limit = 9} = req.query;
            const product = await Products.findAll({
                include: [{
                    model: Categories,
                    as: 'categories',
                    // where:
                }],
                // include:[{
                //     model:TranslateData,
                //     as: 'translation',
                //     // where:
                // }],
                order: [['createdAt', 'desc']],
                offset: (+page - 1) * +limit,
                limit: +limit
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
