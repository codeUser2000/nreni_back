import express from 'express';
import users from './users';
import cart from './cart';
import products from './products';
import categories from "./categories";
import blockquote from "./blockquote";
import UsersController from "../controllers/UsersController";

const router = express.Router();

router.use('/users', users);
router.use('/cart', cart);
router.use('/products', products);
router.use('/blockquote', blockquote);
router.use('/categories', categories);
router.post('/admin', UsersController.adminLogin);

export default router;
