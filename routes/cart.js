import express from 'express';
import CartController from "../controllers/CartController";
import authorization from "../middlewares/authorization";

const router = express.Router();

router.get('/cartItemList', authorization, CartController.cartItemList);
router.get('/getCartItem', authorization, CartController.getCartItem);
router.post('/addToCart',authorization, CartController.addToCart);
router.post('/updateCount',authorization, CartController.updateCartItem);
router.post('/deleteFromCart', CartController.deleteFromCart);

export default router;
