import express from 'express';

import adminAuth from "../middlewares/AdminAuth";
import BlockQuoteController from "../controllers/BlockQuoteController";

const router = express.Router();

router.post('/blockquote', BlockQuoteController.blockquote);
router.post('/deleteBlockquote', adminAuth, BlockQuoteController.deleteBlockquote);
router.get('/getBlockquote', BlockQuoteController.getBlockquote);

export default router;
