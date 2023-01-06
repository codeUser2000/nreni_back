import express from 'express';
import ProductsController from "../controllers/ProductsController";
import uploader from "../middlewares/imgUploader";
import adminAuth from "../middlewares/AdminAuth";

const router = express.Router();

router.post('/createProducts', uploader.single('avatar'), adminAuth, ProductsController.createProducts);
router.post('/delete',adminAuth, ProductsController.delete);
router.post('/update', uploader.single('avatar'), adminAuth, ProductsController.update);
router.get('/products', ProductsController.getProducts);
router.get('/singleProduct', ProductsController.getSingleProduct);
export default router;
