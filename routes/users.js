import express from "express";
import UserController from "../controllers/UserController";
import validate from "../middlewares/validate";
import {usersRegisterSchema} from "../schema/users";

const router = express.Router();

router.post('/register', validate(usersRegisterSchema), UserController.register);
router.get('/confirm', UserController.confirm)
router.post('/login', UserController.login);


export default router;
