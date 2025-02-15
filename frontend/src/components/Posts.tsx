import React from 'react'
import useFetchPostsData from '../hooks/useFetchPostsData'
import { useParams } from 'react-router';
import Post from './Post';
import { IPost } from '../types/post';

const Posts: React.FC = () => {
    const { username } = useParams();
    const { postsData, loading, error } = useFetchPostsData(username || "");

    if (loading) { return (<>loading</>) }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='bg-custom-300'>
            {postsData?.posts.map((post: IPost) =>
                <Post {...post} key={post.id} />
            )}
        </div>
    )
}

export default Posts