import express from 'express';
import ProductsController from "../controllers/ProductsController";
import uploader from "../middlewares/imgUploader";

const router = express.Router();

router.post('/createProducts', uploader.single('avatar'), ProductsController.createProducts);
router.post('/delete', uploader.single('avatar'), ProductsController.delete);
router.get('/products', ProductsController.getProducts);
export default router;
