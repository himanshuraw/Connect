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
        <div className='xl:mx-20 2xl:mx-28 p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2'>
            {postsData?.posts.map((post: IPost) =>
                <Post {...post} key={post.id} />
            )}
        </div>
    )
}

export default Posts