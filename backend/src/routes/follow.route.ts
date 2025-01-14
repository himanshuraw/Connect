import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { FollowController } from "../controllers/follow.controller";

const router = Router();

router.get('/', authenticate, FollowController.getPendingRequests);
router.post('/:requestId', authenticate, FollowController.processFollowRequest);

export default router;