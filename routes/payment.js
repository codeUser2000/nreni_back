import express from 'express';
import PaymentController from "../controllers/PaymentController";


const router = express.Router();

router.post('/create-checkout-session', PaymentController.checkCustomer);
// router.post('/webhook', express.raw({type:'application/json'}), PaymentController.webhook);
router.post('/webhook',  PaymentController.webhook);

export default router;
