import express from 'express';
import PaymentController from "../controllers/PaymentController";


const router = express.Router();

router.post('/create-checkout-session', PaymentController.checkCustomer);

export default router;
