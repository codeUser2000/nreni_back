import {Menu, Products} from "../models";
import HttpError from "http-errors";

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
