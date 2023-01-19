import express from 'express';
import OthersController from "../controllers/OthersController";
import ProductsController from "../controllers/ProductsController";
import authorization from "../middlewares/authorization";


const router = express.Router();

router.post('/like', authorization,  OthersController.productLike);
router.get('/likeGet', OthersController.getLike);
router.get('/likeGetAuth', OthersController.productLike);
// router.post('/likeDelete', authorization,  OthersController.productDeleteLike);


export default router;
