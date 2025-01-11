import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";
import profilePictureRoute from "./profilePicture.route"
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

router.use('/:id/profile-picture', authenticate, profilePictureRoute);

export default router;
