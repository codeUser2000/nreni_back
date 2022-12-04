import express from 'express';
import UsersController from '../controllers/UsersController';
import validate from '../middlewares/validate';
import { usersRegisterSchema } from '../schema/users';

const router = express.Router();

router.post('/register', validate(usersRegisterSchema), UsersController.register);
router.get('/confirm', UsersController.confirm);
router.post('/login', UsersController.login);

router.post('/forget', UsersController.forgetPass);
router.post('/newPassword', UsersController.newPassword);

export default router;
