import React from 'react'
import useFetchPostsData from '../hooks/useFetchPostsData'
import { useParams } from 'react-router';

const Posts: React.FC = () => {
    const { username } = useParams();
    const { postsData, loading, error } = useFetchPostsData(username || "");

    if (loading) { return (<>loading</>) }
    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='bg-custom-300'>
            {postsData?.posts.map((post: any) =>
                <div key={post.id}>
                    <div>

                        {post.author.username}
                    </div>
                    <div>

                        {post.caption}
                    </div>
                    <img src={post.imageUrl} />

                </div>
            )}
        </div>
    )
}

export default Posts