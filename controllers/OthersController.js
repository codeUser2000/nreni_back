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
    static like = async (req, res, next) => {
        try {
            const {id, like} = req.body;

            const product = await Products.findOne({
                where: {id}
            })
            if(!product){
                throw HttpError(403,"no such product")
            }
            if(like){
                await Products.update(
                    {
                        like: product.like + 1
                    },
                    {
                        where: {id}
                    });
            }else{
                await Products.update(
                    {
                        like: product.like - 1
                    },
                    {
                        where: {id}
                    });
            }

            res.json({
                status: "ok"
            });

        } catch (e) {
            next(e);
        }
    }

}

export default OthersController
