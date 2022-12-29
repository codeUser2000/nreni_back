import express from 'express';
import cartController from "../controllers/CartController";
import authorization from "../middlewares/authorization";

const router = express.Router();

router.post('/cart', cartController.cart);
router.get('/getCartItem', cartController.getCartItem);
// es masy mi hat naye jisht e te che or stex auth em tve
router.get('/cartItemList', authorization, cartController.cartItemList);
router.post('/addToCart', cartController.addToCart);
router.post('/deleteFromCart', cartController.deleteFromCart);

export default router;
