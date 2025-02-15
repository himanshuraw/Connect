export interface IPost {
    id: number;
    author: Author;
    caption: string;
    commentCount: number;
    imageUrl: string;
    likeCount: number;
    tags: string[];
    createdAt: Date;
}

export interface Author {
    id: number;
    profilePictureUrl: string;
    username: string;
}

export interface IPosts {
    currentPage: number;
    posts: IPost[];
    total: number;
    totalPages: number;
}