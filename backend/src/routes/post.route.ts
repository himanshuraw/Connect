import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { PostController } from "../controllers/post.controller";

import likeRoutes from "../routes/like.route";

const router = Router();

router.post("/", authenticate, PostController.createPost);
router.get("/:userId", PostController.getAllPostByUser);
router.delete("/:id", authenticate, PostController.deletePost);


router.use("/:postId/likes", authenticate, likeRoutes)

export default router;