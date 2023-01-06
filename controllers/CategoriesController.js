import {Categories} from '../models';


class CategoriesController {

    static category = async (req, res, next) => {
        try {

            const category = await Categories.findAll();
            res.json({
                status: 'ok',
                category
            })

        } catch (e) {
            next(e);
        }
    }

}

export default CategoriesController;
