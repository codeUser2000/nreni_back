import {Menu} from "../models";

class OthersController{
    static getMenu = async (req, res, next) => {
        try{
            const menu = await Menu.findAll();
            res.json({
                status:'ok',
                menu
            })
        }catch (e){
            next(e)
        }
    }
}

export default OthersController
