import { Router } from "express";
import { FeedController } from "../controllers/feed.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router();

router.get('/', authenticate, FeedController.getFeedForUser);

export default router;