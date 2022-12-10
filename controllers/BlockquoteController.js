import {Categories} from '../models';


class BlockquoteController {

    static category = async (req, res, next) => {
        try {
            const {type} = req.body;

            const category = await Categories.create({type});


            res.json({
                status: 'ok',
                category
            })

        } catch (e) {
            next(e);
        }
    }

}

export default BlockquoteController;
