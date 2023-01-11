import express from 'express';
import OthersController from "../controllers/OthersController";
import ProductsController from "../controllers/ProductsController";


const router = express.Router();

router.get('/menu',  OthersController.getMenu);


export default router;
