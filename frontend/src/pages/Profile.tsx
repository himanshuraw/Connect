import React from 'react'
import { useParams } from 'react-router'
import useFetcUserData from '../hooks/useFetchUserData';
import Posts from '../components/Posts';
import ProfilePicture from '../components/ProfilePicture';

const Profile: React.FC = () => {
    const { username } = useParams();

    const { userData, loading, error } = useFetcUserData(username || '')

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='flex flex-col md:flex-row h-full'>
            <div className='p-4 w-72'>
                {userData && (
                    <div className='bg-dark-charcoal h-full rounded-md p-4'>
                        <div className='flex items-center justify-center'>
                            <ProfilePicture url={userData.profilePictureUrl} />
                        </div>

                        <p>Name: {userData.username}</p>
                        <p>Bio: {userData.about}</p>
                        <p>Followers: {userData.followerCount}</p>
                        <p>Following: {userData.followingCount}</p>
                        {/* Add more user data fields as needed */}
                    </div>
                )}
            </div>
            <div className='flex-1 overflow-y-auto p-4'>
                <Posts />
            </div>
        </div>
    )
}

export default Profile