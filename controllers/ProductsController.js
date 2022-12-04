import {Categories, Products} from '../models';
import jwt from "jsonwebtoken";


class ProductsController {

    static categories = async (req, res, next) => {
        try {
            const {name} = req.body;

            const token = jwt.sign({userId: user.id}, JWT_SECRET);
            const category = await Categories.create({name});


            res.json({
                status: 'ok',
                category
            })

        } catch (e) {
            next(e);
        }
    }

    static shop = async (req, res, next) => {
        try {
            const {title, description, categoryId, price, discount, shop, type} = req.body;

            const product = await Products.create({
                title, description, categoryId, price, discount, shop, type
            });

            console.log(product);

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
