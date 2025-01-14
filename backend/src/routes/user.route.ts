import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { AuthController } from "../controllers/auth.controller";
import { FollowController } from "../controllers/follow.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

router.patch('/:id/profile-picture', authenticate, UserController.addProfilePicture);

router.patch('/privacy', authenticate, UserController.togglePrivacy);

router.post('/:id/follow', authenticate, FollowController.handleFollowAction);



export default router;
