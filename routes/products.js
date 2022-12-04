import express from 'express';
import ProductsController from '../controllers/ProductsController';

const router = express.Router();

router.get('/categories', ProductsController.categories);
router.get('/shop', ProductsController.shop);

export default router;
