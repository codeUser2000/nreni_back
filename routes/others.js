import express from 'express';
import OthersController from "../controllers/OthersController";


const router = express.Router();

router.get('/menu',  OthersController.getMenu);
// router.get('/getCartItem',  CartController.getCartItem);
// router.post('/addToCart', CartController.addToCart);
// router.post('/updateCount', CartController.updateCartItem);
// router.post('/deleteFromCart', CartController.deleteFromCart);

export default router;
