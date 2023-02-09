import {Blockquote} from "../models";
import HttpError from "http-errors";

class BlockQuoteController {

    static blockquote = async (req, res, next) => {
        try {
            const {firstName, lastName, message, view = "not allowed"} = req.body;

            const quote = await Blockquote.create({
                firstName, lastName, message, view
            });

            res.json({
                status: 'ok',
                quote,
            });

        } catch (e) {
            next(e);
        }
    }

    static deleteBlockquote = async (req, res, next) => {
        try {
            const {id} = req.body;

            const blockquote = await Blockquote.findOne({
                where: {id}
            });

            if (!blockquote) {
                throw HttpError(403, 'There is no such blockquote');
            }


            await blockquote.destroy()

            const blockquotes = await Blockquote.findAll({
                order: [['createdAt', 'desc']],
                limit: 9,
            })
            const total = await Blockquote.count();

            res.json({
                status: 'ok',
                blockquotes,
                total,
                totalPages: Math.ceil(total / 9)
            });

        } catch (e) {
            next(e);
        }
    }

    static getBlockquoteUser = async (req, res, next) => {
        try {

            const quote = await Blockquote.findAll({
                where: {view: 'allowed'},
                limit: 3,
                order: [['createdAt', 'desc']],
            });

            res.json({
                status: 'ok',
                quote,
            });

        } catch (e) {
            next(e);
        }
    }

    static getBlockquoteAdmin = async (req, res, next) => {
        try {

            const quote = await Blockquote.findAll({
                limit: 10,
                order: [['createdAt', 'desc']],
            });
            const total = await Blockquote.count();
            res.json({
                status: 'ok',
                quote,
                total,
                totalPages: Math.ceil(total / 9)
            });

        } catch (e) {
            next(e);
        }
    }

    static setBlockquoteView = async (req, res, next) => {
        try {
            const {id, ev} = req.body;
            console.log(ev === 'allowed')
            if(ev === 'allowed'){
                await Blockquote.update(
                    {view: "not allowed"},
                    {
                        where: {id}
                    }
                );
            }else{
                await Blockquote.update(
                    {view: "allowed"},
                    {
                        where: {id}
                    }
                );
            }

            const quote = await Blockquote.findAll({
                limit: 10,
                order: [['createdAt', 'desc']],
            });
            const total = await Blockquote.count();
            res.json({
                status: 'ok',
                quote,
                total,
                totalPages: Math.ceil(total / 9)
            });

        } catch (e) {
            next(e);
        }
    }

}

export default BlockQuoteController
