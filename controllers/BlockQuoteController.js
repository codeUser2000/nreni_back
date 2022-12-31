import {Blockquote} from "../models";
import HttpError from "http-errors";

class BlockQuoteController {

    static blockquote = async (req, res, next) => {
        try {
            const {firstName, lastName, message} = req.body;

            const quote = await Blockquote.create({
                firstName, lastName, message
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

    static getBlockquote = async (req, res, next) => {
        try {

            const quote = await Blockquote.findAll({
                limit: 10,
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

}

export default BlockQuoteController
