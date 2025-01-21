import { IsNull } from "typeorm";
import { AppDataSource } from "../config/db";
import { Comment } from "../models/postgresql/Comment";
import { Post } from "../models/postgresql/Post";

export class CommentService {
    private static commentRepository = AppDataSource.getRepository(Comment);
    private static postRepository = AppDataSource.getRepository(Post);

    static async getCommentsForPost(postId: number) {
        const post = await this.postRepository.findOne({
            where: { id: postId },
        });

        if (!post) throw new Error(`Post with postId ${postId} doesn't exist`);

        const comments = await this.commentRepository.find({
            where: { post: { id: postId }, parent: IsNull() },
            relations: ['author', 'replies'],
            order: { createdAt: 'ASC' }
        })

        return comments.map(({ author: { id, username, profilePictureUrl }, ...commentDetails }) => ({
            author: { id, username, profilePictureUrl },
            ...commentDetails,
        }));


    }

    static async createCommentForPost(postId: number, userId: number, content: string, parentCommentId?: number) {
        const post = await this.postRepository.findOne({
            where: { id: postId }
        });

        if (!post) throw new Error(`Post with postId ${postId} doesn't exist`);

        let parentComment = null;
        if (parentCommentId) {
            parentComment = await this.commentRepository.findOne({
                where: { id: parentCommentId }
            })
        }

        const comment = this.commentRepository.create({
            content,
            post,
            author: { id: userId } as any,
            parent: parentComment || undefined,
        })

        return this.commentRepository.save(comment);
    }
}
