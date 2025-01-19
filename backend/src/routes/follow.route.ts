import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { FollowController } from "../controllers/follow.controller";

const router = Router();

router.get('/pending', authenticate, FollowController.getPendingRequests);
router.get('/:userId/followers', FollowController.getFollowers);
router.get('/:userId/followings', FollowController.getFollowings);
router.post('/:id', authenticate, FollowController.handleFollowAction)
router.post('/requests/:requestId', authenticate, FollowController.processFollowRequest);

export default router;