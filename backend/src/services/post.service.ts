import { AppDataSource } from "../config/db";
import { PostDto } from "../dto/PostDto";
import { Post } from "../models/postgresql/Post";
import { User } from "../models/postgresql/User";

export class PostService {
    private static postRepository = AppDataSource.getRepository(Post);
    private static userRepository = AppDataSource.getRepository(User);

    static async getAllPost() {
        return this.postRepository.find({
            relations: ["author", "comments", "likes"],
            order: { createdAt: "DESC" },
        });
    }

    static async getPostById(id: number) {
        return this.postRepository.findOne({
            where: { id },
            relations: ["author"]
        });
    }

    static async getAllPostByUser(id: number, page: number, limit: number) {

        const [posts, total] = await this.postRepository.findAndCount({
            where: { author: { id } },
            relations: ["author", "comments", "likes"],
            order: { createdAt: "DESC" },
            skip: (page - 1) * limit,
            take: limit
        });

        const formattedPosts = posts.map(({ author, ...postDetails }) => ({
            ...postDetails,
            author: {
                id: author.id,
                email: author.email,
                username: author.username,
                profilePictureUrl: author.profilePictureUrl,
            },
        }));

        return { posts: formattedPosts, total }

    }

    static async getPostsByUsername(username: string, page: number, limit: number) {
        const userRepository = AppDataSource.getRepository(User);
        const postRepository = AppDataSource.getRepository(Post);

        const user = await userRepository.findOne({ where: { username } });
        if (!user) {
            throw new Error("User not found");
        }

        const posts = await postRepository
            .createQueryBuilder("post")
            .leftJoinAndSelect("post.author", "author")
            .leftJoinAndSelect("post.comments", "comment")
            .leftJoinAndSelect("post.likes", "like")
            .select([
                "post.id",
                "post.imageUrl",
                "post.caption",
                "post.tags",
                "post.createdAt",
                "author.id",
                "author.username",
                "author.profilePictureUrl",
            ])
            .addSelect("COUNT(DISTINCT comment.id)", "commentCount")
            .addSelect("COUNT(DISTINCT like.id)", "likeCount")
            .where("author.id = :userId", { userId: user.id })
            .groupBy("post.id")
            .addGroupBy("author.id")
            .orderBy("post.createdAt", "DESC")
            .skip((page - 1) * limit)
            .take(limit)
            .getRawMany();

        const formattedPosts = posts.map((post) => ({
            id: post.post_id,
            imageUrl: post.post_imageUrl,
            caption: post.post_caption,
            tags: post.post_tags ? post.post_tags.split(",") : [],
            createdAt: post.post_createdAt,
            author: {
                id: post.author_id,
                username: post.author_username,
                profilePictureUrl: post.author_profilePictureUrl,
            },
            commentCount: parseInt(post.commentCount, 10) || 0,
            likeCount: parseInt(post.likeCount, 10) || 0,
        }));

        const total = await postRepository.count({ where: { author: { id: user.id } } });

        return { posts: formattedPosts, total };
    }


    static async createPost(data: PostDto) {
        const { authorId, imageUrl, caption, tags } = data;

        const author = await this.userRepository.findOne({
            where: { id: authorId }
        });

        if (!author) {
            throw new Error(`Author with ID ${authorId} not found`);
        }

        const newPost = this.postRepository.create({
            author,
            imageUrl,
            caption,
            tags,
        })

        return await this.postRepository.save(newPost);
    }

    static async deletePostById(id: number) {
        const result = await this.postRepository.delete(id);
        return result.affected! > 0;
    }
}