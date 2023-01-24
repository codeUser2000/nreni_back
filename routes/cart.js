import express from 'express';
import CartController from "../controllers/CartController";
import authorization from "../middlewares/authorization";
import adminAuth from "../middlewares/AdminAuth";

const router = express.Router();

router.get('/cartItemList', authorization, CartController.cartItemList);
router.get('/getCartItem', adminAuth, CartController.getCartItem);
router.post('/addToCart',authorization, CartController.addToCart);
router.post('/updateCount',authorization, CartController.updateCartItem);
router.post('/deleteFromCart', authorization, CartController.deleteFromCart);

export default router;
