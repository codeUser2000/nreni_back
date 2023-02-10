import Stripe from "stripe";
import {Orders, Products} from "../models";

const {STRIPE_SECRET_KEY, FRONT_URL, BACK_URL} = process.env;
const stripe = new Stripe(STRIPE_SECRET_KEY, {
    apiVersion: '2022-11-15',
});

class PaymentController {
    static checkCustomer = async (req, res, next) => {
        try {
            const {userId} = req;
            const customer = await stripe.customers.create({
                metadata: {
                    userId,
                    cart: JSON.stringify(req.body)
                }
            })
            const allData = req.body
            const productId = [];
            const final = [];

            allData.map((p) => {
                productId.push(p.productId)
                return p;
            })


            const products = await Products.findAll({
                where: {id: productId}
            })

            for(let i = 0; i< products.length;i++){
                final.push({
                    price: allData[i].price,
                    quantity: allData[i].quantity,
                    product: products[i]
                })
            }

            let line_items = final.map((data) => {
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: data.product.title,
                            description: data.product.description,
                        },
                        unit_amount: data.price * 100,
                    },
                    quantity: +data.quantity,
                }

            })


            const session = await stripe.checkout.sessions.create({
                line_items,
                customer: customer.id,
                mode: 'payment',
                success_url: `${FRONT_URL}profile`,
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
            let endpointSecretAida;

            const createOrder = async function (customer, data) {
                const items = JSON.parse(customer.metadata.cart)
                const productId = [];
                const final = []
                items.map((p) => {
                    productId.push(p.productId)
                    return p;
                })

                const products = await Products.findAll({
                    where: {id: productId}
                })
                console.log(items)
                for(let i = 0; i<products.length ;i++){
                    console.log(products.length ,items.length)
                    for(let j = 0; j<products.length ;j++){
                        if(items[i].productId === products[j].id){
                            final.push({
                                price:items[i].price,
                                quantity:items[i].quantity,
                                products:products[j]
                            })
                        }
                    }
                }
                await Orders.create({
                    userId: customer.metadata.userId,
                    customerId: data.customer,
                    paymentIntentId: data.payment_intent,
                    products: final,
                    total: data.amount_total,
                    paymentStatus: data.payment_status,
                })
            }
            // endpointSecretNara = "whsec_c1ba19188c7e68fe13d809d2fab77f72f66df54731bd3761d785e5e827e1fd74";
            // endpointSecretAida = "whsec_c92f802ba1c75864d7fc7182b2b1c7c9891d53c2407a66c91dfca308b35b2efd";

            const sig = req.headers['stripe-signature'];
            let data;
            let eventType;
            if (endpointSecretAida) {

                let event;

                try {
                    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecretAida);
                } catch (err) {
                    res.status(400).send(`Webhook Error: ${err.message}`);
                    return;
                }

                data = event.data.object;
                eventType = event.type;
            } else {
                data = req.body.data.object;
                eventType = req.body.type;
            }
            if (eventType === 'checkout.session.completed') {
                stripe.customers.retrieve(data.customer).then((customer) => {
                    createOrder(customer, data)
                }).catch(err => console.log(err.message))
            }
            res.send().end();
        } catch (e) {
            next(e);
        }
    }
}


export default PaymentController;
