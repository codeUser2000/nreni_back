import {Categories, Products} from "../models";


class ProductsController {

    // static categories = async (req, res, next) => {
    //     try {
    //         const {status} = req.query;
    //         const {name} = req.body;
    //
    //         const category = await Categories.create({
    //             name
    //         });
    //
    //         res.json({
    //             status: 'ok',
    //             category,
    //         });
    //
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    //
    // static shop = async (req, res, next) => {
    //     try {
    //         const {title, description, categoryId, price, discount, shop, type} = req.body;
    //
    //         const product = await Products.create({
    //             title, description, categoryId, price, discount, shop, type
    //         });
    //         console.log(product);
    //
    //         res.json({
    //             status: 'ok',
    //             product,
    //         });
    //
    //     } catch (e) {
    //         next(e);
    //     }
    // }
}

export default ProductsController


