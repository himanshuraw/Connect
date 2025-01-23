import { IsNull } from "typeorm";
import { AppDataSource } from "../config/db";
import { Comment } from "../models/postgresql/Comment";
import { Post } from "../models/postgresql/Post";
import { CommentDto } from "../dto/CommentDto";

export class CommentService {
    private static commentRepository = AppDataSource.getRepository(Comment);
    private static postRepository = AppDataSource.getRepository(Post);

    static async getCommentsForPost(postId: number) {
        const post = await this.postRepository.findOne({
            where: { id: postId },
        });

        if (!post)
            throw new Error(`Post with postId ${postId} doesn't exist`);

        const comments = await this.commentRepository.find({
            where: { post: { id: postId }, parent: IsNull() },
            relations: ['author', 'replies'],
            order: { createdAt: 'ASC' }
        })

        return comments.map(this.mapCommentReposnse);
    }

    private static mapCommentReposnse(comment: Comment) {
        const { author: { id, username, profilePictureUrl }, ...commentDetails } = comment;
        return {
            author: { id, username, profilePictureUrl },
            ...commentDetails,
        }
    }

    static async createCommentForPost(postId: number, userId: number, commentDto: CommentDto) {
        const { content, parentCommentId } = commentDto;
        const post = await this.postRepository.findOne({
            where: { id: postId }
        });

        if (!post) throw new Error(`Post with postId ${postId} doesn't exist`);

        let parentComment = null;
        if (parentCommentId) {
            parentComment = await this.commentRepository.findOne({
                where: { id: parentCommentId, post: { id: postId } }
            })

            if (!parentComment)
                throw new Error(`Parent comment with ID ${parentCommentId} doesn't exist or doesn't belong to the post ${postId}`)
        }

        const comment = this.commentRepository.create({
            content,
            post,
            author: { id: userId } as any,
            parent: parentComment || undefined,
        })

        return this.commentRepository.save(comment);
    }

    static async deleteComment(commentId: number, userId: number) {
        const comment = await this.commentRepository.findOne({
            where: { id: commentId },
            relations: ['author', 'post', 'post.author'],
        })

        if (!comment) throw new Error(`Comment with id ${commentId} not found`);

        if (comment.author.id !== userId && comment.post.author.id !== userId)
            throw new Error(`You are not authorized to delete this comment`);


        const result = this.commentRepository.delete(commentId);

        return (await result).affected! > 0;
    }
}
