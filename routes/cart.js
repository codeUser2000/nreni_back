import express from 'express';
import CartController from "../controllers/CartController";
import authorization from "../middlewares/authorization";

const router = express.Router();

router.post('/cart', CartController.cart);
router.get('/getCartItem', CartController.getCartItem);
// es masy mi hat naye jisht e te che or stex auth em tve
router.get('/cartItemList', authorization, CartController.cartItemList);
router.post('/addToCart', CartController.addToCart);
router.post('/deleteFromCart', CartController.deleteFromCart);

export default router;
