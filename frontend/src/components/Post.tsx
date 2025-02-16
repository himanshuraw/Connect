import React from 'react'
import { IPost } from '../types/post'
import ImageContainer from './ImageContainer'
import { BiComment } from 'react-icons/bi'

const Post: React.FC<IPost> = (post) => {
    return (
        <div className='aspect-[1/1.33] rounded-sm overflow-hidden'>
            <ImageContainer url={post.imageUrl} alt={post.caption} />
            <div className='flex gap-4'>
                <div>{post.likeCount}</div>
                <div className='flex items-center gap-1' >
                    <BiComment />
                    <div>{post.commentCount}</div>
                </div>
            </div>
        </div>
    )
}

export default Post