import Stripe from "stripe";

const {STRIPE_SECRET_KEY, FRONT_URL, BACK_URL} = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});
class PaymentController {
    static checkCustomer = async (req, res, next) => {
        try {
            let line_items = req.body.map(data => {
                console.log(BACK_URL + data.product.avatar)
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: data.product.title,
                            description: data.product.description,
                        },
                        unit_amount: 2000,
                    },
                    quantity: +data.quantity,
                }
            })
            const session = await stripe.checkout.sessions.create({
                line_items,
                mode: 'payment',
                success_url: `${FRONT_URL}shop`,
                cancel_url: `${FRONT_URL}cart`,
            })
            res.send({
                status: 'ok',
                url: session.url
            })
        } catch (e) {
            next(e);
        }
    }
    static webhook = async (req, res, next) => {
        try {
            let endpointSecret;

            // endpointSecret = "whsec_c1ba19188c7e68fe13d809d2fab77f72f66df54731bd3761d785e5e827e1fd74";

            const sig = req.headers['stripe-signature'];
            let data;
            let eventType;
            if (endpointSecret) {

                let event;

                try {
                    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
                    console.log('webhook verified')
                } catch (err) {
                    console.log(`webhook error: ${err.message}`)
                    res.status(400).send(`Webhook Error: ${err.message}`);
                    return;
                }

                data = event.data.object;
                eventType = event.type;
            } else {
                data = req.body.data.object;
                eventType = req.body.type;
            }
            // Handle the event
            if (eventType === 'checkout.session.completed') {

            }
            // Return a 200 response to acknowledge receipt of the event
            res.send().end();
        } catch (e) {
            next(e);
        }
    }
}


export default PaymentController;
