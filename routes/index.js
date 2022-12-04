import express from 'express';
import users from './users';
import products from './products';
import UsersController from "../controllers/UsersController";

const router = express.Router();

router.use('/users', users);
router.use('/products', products);

export default router;
