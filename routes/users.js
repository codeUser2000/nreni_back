import express from 'express';
import UsersController from '../controllers/UsersController';
import validate from '../middlewares/validate';
import {usersRegisterSchema} from '../schema/users';
import adminAuth from "../middlewares/AdminAuth";

const router = express.Router();

router.post('/register', validate(usersRegisterSchema), UsersController.register);
router.get('/confirm', UsersController.confirm);
router.get('/list', adminAuth, UsersController.list);
router.post('/login', UsersController.login);
router.post('/forget', UsersController.forgetPass);
router.post('/newPassword', UsersController.newPassword);
router.post('/delete', UsersController.delete);
router.post('/blockquote', UsersController.blockquote);
router.get('/getBlockquote', UsersController.getBlockquote);

export default router;
