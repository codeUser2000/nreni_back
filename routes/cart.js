import express from 'express';
import CartController from "../controllers/CartController";
import authorization from "../middlewares/authorization";

const router = express.Router();

router.get('/cartItemList', authorization, CartController.cartItemList);
router.post('/addToCart',authorization, CartController.addToCart);
router.post('/addToCartLocal',authorization, CartController.addToCartFromLocalStorage);
router.post('/updateCount',authorization, CartController.updateCartItem);
router.post('/deleteFromCart', authorization, CartController.deleteFromCart);

export default router;
