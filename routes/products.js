import express from 'express';
import ProductsController from "../controllers/ProductsController";
import uploader from "../middlewares/imgUploader";
import adminAuth from "../middlewares/AdminAuth";

const router = express.Router();

router.post('/createProducts', adminAuth, uploader.single('avatar'), ProductsController.createProducts);
router.post('/delete',adminAuth, ProductsController.delete);
router.post('/update',adminAuth,uploader.single('avatar'), ProductsController.update);
router.get('/products', ProductsController.getProducts);
router.get('/singleProduct', ProductsController.getSingleProduct);
export default router;
