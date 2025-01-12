import { Router } from "express";
import { UserController } from "../controllers/user.controller";

const router = Router({ mergeParams: true });

router.post('/', UserController.addProfilePicture);

export default router;