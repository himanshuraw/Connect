import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";
import { authenticate } from "../middlewares/auth.middleware";

import followRouter from "./follow.route"


const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

router.patch('/profile-picture', authenticate, UserController.addProfilePicture);

router.patch('/privacy', authenticate, UserController.togglePrivacy);

router.use('/follow', followRouter);




export default router;
