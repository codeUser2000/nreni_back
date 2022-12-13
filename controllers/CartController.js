class CartController {
    static cart = async (req, res, next) => {
        try {
            const {userId, status, firstName, lastName, email} = req.body;

            res.json({
                status: 'ok',
            })
        } catch (e) {
            next(e);
        }
    }
    static getCartItem = async (req, res, next) => {
        try {
            const {productId, cartId, price, quantity, status} = req.body


            res.json({
                status: 'ok',
            })
        } catch (e) {
            next(e);
        }
    }
}

export default CartController;
