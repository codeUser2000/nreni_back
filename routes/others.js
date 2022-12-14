import express from 'express';
import OthersController from "../controllers/OthersController";
import ProductsController from "../controllers/ProductsController";
import authorization from "../middlewares/authorization";


const router = express.Router();

router.get('/menu',  OthersController.getMenu);
router.post('/like', authorization,  OthersController.productLike);


export default router;
