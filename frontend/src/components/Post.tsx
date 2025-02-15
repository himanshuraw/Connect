import React from 'react'
import { IPost } from '../types/post'

const Post: React.FC<IPost> = (post) => {
    return (
        <div>
            <img src={post.imageUrl} />
            <div>{post.author.username}</div>
            <div>{post.caption}</div>
            <div>{post.likeCount}</div>
            <div>{post.commentCount}</div>
        </div>
    )
}

export default Post