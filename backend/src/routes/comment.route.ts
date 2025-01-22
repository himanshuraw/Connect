import { Router } from "express";
import { CommentController } from "../controllers/comment.controller";
import { authenticate } from "../middlewares/auth.middleware";

const router = Router({ mergeParams: true });

router.get('/', CommentController.getCommentsForPost);
router.post('/', authenticate, CommentController.createCommentForPost);
router.delete('/:commentId', authenticate, CommentController.deleteComment)

export default router;