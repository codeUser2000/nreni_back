import HttpError from "http-errors";
import Stripe from "stripe";
import {isEmpty} from "lodash";

const {STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY, FRONT_URL} = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});

class PaymentController {
    // static checkCustomer = async (req, res, next) => {
    //     try {
    //         const {id} = req.query;
    //         let customer = await stripe.customers.search({
    //             query: `metadata["userId"]:${id}`
    //         });
    //
    //         if (customer === null || isEmpty(customer.data)) {
    //             customer === null
    //         }
    //     } catch (e) {
    //         next(e);
    //     }
    // }
    static checkCustomer = async (req, res, next) => {
        try {
            let line_items = req.body.map(d => {
               return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: d.product.title,
                        },
                        unit_amount: +d.product.price * +d.product.discount,
                    },
                    quantity: +d.quantity,
                }
            })
            const session = await stripe.checkout.sessions.create({
            line_items,
            mode: 'payment',
            success_url: `${FRONT_URL}shop`,
            cancel_url: `${FRONT_URL}cart`,
        })
            res.send({
                status:'ok',
                url: session.url
            })
        } catch (e) {
            next(e);
        }
    }


}

export default PaymentController;
