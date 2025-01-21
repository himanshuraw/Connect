import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { PostController } from "../controllers/post.controller";

import likeRoutes from "../routes/like.route";
import commentRoutes from "../routes/comment.route"

const router = Router();

router.post("/", authenticate, PostController.createPost);
router.get("/:userId", PostController.getAllPostByUser);
router.delete("/:id", authenticate, PostController.deletePost);


router.use("/:postId/likes", authenticate, likeRoutes)
router.use('/:postId/comments', commentRoutes)

export default router;