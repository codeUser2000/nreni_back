import {Products} from '../models';
import path from "path";
import {v4 as uuidV4} from 'uuid';
import imgPromise from "../services/imgPromise";


class ProductsController {

    static createProducts = async (req, res, next) => {
        try {
            const {title, description, categoryId, price, discount, shop} = req.body;
            const {file} = req;

            const originalName = file.originalname.replace(/\..+$/, '.jpg');

            const avatar = path.join('/img', uuidV4() + '-' + originalName);
            await imgPromise('../public', file, avatar)

            const product = await Products.create({
                title, description, categoryId, price, discount, shop, avatar
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
