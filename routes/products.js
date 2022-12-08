import express from 'express';
import uploader from '../middlewares/imgUploader';
import ProductsController from "../controllers/ProductsController";

const router = express.Router();

router.post('/createProducts', uploader.single('avatar'), ProductsController.createProducts);

export default router;
