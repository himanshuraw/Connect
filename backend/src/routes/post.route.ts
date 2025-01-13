import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { PostController } from "../controllers/post.controller";

const router = Router();

router.post("/", authenticate, PostController.createPost);
router.get("/:userId", PostController.getAllPostByUser);
router.delete("/:id", authenticate, PostController.deletePost);


export default router;