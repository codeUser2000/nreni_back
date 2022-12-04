import express from 'express';
import UsersController from '../controllers/UsersController';
import validate from '../middlewares/validate';
import { usersRegisterSchema } from '../schema/users';

const router = express.Router();

router.post('/register', validate(usersRegisterSchema), UsersController.register);
router.get('/confirm', UsersController.confirm);
router.post('/login', UsersController.login);
router.get('/list', UsersController.list);
router.post('/forgetPass', UsersController.forgetPass);

export default router;
