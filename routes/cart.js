import express from 'express';
import cartController from "../controllers/CartController";

const router = express.Router();

router.post('/cart', cartController.cart);
router.post('/cartItem', cartController.cartItem);
router.get('/getCartItem', cartController.getCartItem);
router.post('/deleteCartItem', cartController.deleteCartItem);

export default router;
