import HttpError from "http-errors";
import Stripe from "stripe";
import {isEmpty} from "lodash";

const {STRIPE_PUBLIC_KEY, STRIPE_SECRET_KEY} = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});

class PaymentController {
    static checkCustomer = async (req, res, next) => {
        try {
            const {id} = req.query;
            let customer = await stripe.customers.search({
                query: `metadata["userId"]:${id}`
            });

            if (customer === null || isEmpty(customer.data)) {
                customer === null
            }
        } catch (e) {
            next(e);
        }
    }


}

export default PaymentController;
