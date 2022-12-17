import express from 'express';
import users from './users';
import products from './products';
import categories from "./categories";
import UsersController from "../controllers/UsersController";

const router = express.Router();

router.use('/users', users);
router.use('/products', products);
router.use('/categories', categories);
router.post('/admin', UsersController.adminLogin);

export default router;
