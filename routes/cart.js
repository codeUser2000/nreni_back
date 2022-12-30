import express from 'express';
import CartController from "../controllers/CartController";
import authorization from "../middlewares/authorization";

const router = express.Router();

// es masy mi hat naye jisht e te che or stex auth em tve
router.get('/cartItemList', authorization, CartController.cartItemList);
router.get('/getUserCartItem', authorization, CartController.getUserCartItem);
router.post('/addToCart',authorization, CartController.addToCart);
router.post('/deleteFromCart', CartController.deleteFromCart);

export default router;
