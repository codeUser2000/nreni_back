import express from 'express';
import users from './users';
import products from './products';
import categories from "./categories";

const router = express.Router();

router.use('/users', users);
router.use('/products', products);
router.use('/categories', categories);

export default router;
