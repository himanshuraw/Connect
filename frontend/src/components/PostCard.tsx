import React from 'react'
import { IPost } from '../types/post'
import ImageContainer from './ImageContainer'
import { BiComment, BiHeart } from 'react-icons/bi'

const PostCard: React.FC<IPost> = (post) => {
    return (
        <div className='aspect-[1/1.33] rounded-sm overflow-hidden relative group'>
            <ImageContainer url={post.imageUrl} alt={post.caption} />
            <div className='flex gap-4 absolute h-full w-full top-0 items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/70 lg:text-2xl'>
                <div className='flex items-center gap-1' >
                    <BiHeart />
                    <div>{post.likeCount}</div>
                </div>
                <div className='flex items-center gap-1' >
                    <BiComment />
                    <div>{post.commentCount}</div>
                </div>
            </div>
        </div>
    )
}

export default PostCard;