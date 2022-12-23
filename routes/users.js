import express from 'express';
import UsersController from '../controllers/UsersController';
import validate from '../middlewares/validate';
import {usersRegisterSchema} from '../schema/users';
import adminAuth from "../middlewares/AdminAuth";
import authorization from "../middlewares/authorization";

const router = express.Router();

router.post('/register', validate(usersRegisterSchema), UsersController.register);
router.post('/confirm', UsersController.confirm);
router.get('/list', adminAuth, UsersController.list);
router.post('/login', UsersController.login);
router.post('/forget', UsersController.forgetPass);
router.post('/newPassword', UsersController.newPassword);
router.post('/delete', adminAuth, UsersController.delete);
router.post('/deleteSelf', authorization, UsersController.userSelfDelete);
router.post('/blockquote', UsersController.blockquote);
router.post('/deleteBlockquote', adminAuth, UsersController.deleteBlockquote);
router.get('/getBlockquote', UsersController.getBlockquote);

export default router;
