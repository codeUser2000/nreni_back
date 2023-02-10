import express from 'express';
import OthersController from "../controllers/OthersController";
import ProductsController from "../controllers/ProductsController";
import authorization from "../middlewares/authorization";
import adminAuth from "../middlewares/AdminAuth";


const router = express.Router();

router.post('/like', authorization,  OthersController.productLike);
router.get('/orders', adminAuth,  OthersController.getOrders);
router.get('/getSingleOrder', authorization,  OthersController.getSingleOrder);
router.post('/likeDelete', authorization,  OthersController.productDeleteLike);


export default router;
