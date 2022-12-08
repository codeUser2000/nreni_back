import express from 'express';
import CategoriesController from "../controllers/CategoriesController";

const router = express.Router();

router.post('/category', CategoriesController.category);

export default router;
