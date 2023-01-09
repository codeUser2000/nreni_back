import express from 'express';

import adminAuth from "../middlewares/AdminAuth";
import BlockQuoteController from "../controllers/BlockQuoteController";

const router = express.Router();

router.post('/blockquote', BlockQuoteController.blockquote);
router.post('/deleteBlockquote', adminAuth, BlockQuoteController.deleteBlockquote);
router.post('/setBlockquoteView', adminAuth, BlockQuoteController.setBlockquoteView);
router.get('/getBlockquoteForUser', BlockQuoteController.getBlockquoteUser);
router.get('/getBlockquoteForAdmin',adminAuth, BlockQuoteController.getBlockquoteAdmin);

export default router;
