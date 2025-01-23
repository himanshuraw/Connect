import { Router } from "express";
import { LikeController } from "../controllers/like.controller";

const router = Router({ mergeParams: true });

router.get("/", LikeController.getLikesForPost);
router.post("/toggle", LikeController.toggleLikePost);

export default router;