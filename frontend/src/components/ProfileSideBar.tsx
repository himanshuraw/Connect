import React from 'react'
import ProfilePicture from './ProfilePicture'
import { useParams } from 'react-router';
import Counter from './Counter';
import useFetchData from '../hooks/UseFetchData';
import { UserData } from '../types/user';

const ProfileSideBar: React.FC = () => {

    const { username } = useParams();

    const { data: userData, loading, error } = useFetchData<UserData>(`/users/${username}`, true)

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }
    return (
        <>
            {userData && (
                <div className='h-full flex md:flex-col gap-4'>
                    <div className='flex flex-col gap-3.5 py-4 px-16 md:p-4 md:bg-dark-charcoal rounded-lg'>
                        <div className='flex items-center justify-center'>
                            <ProfilePicture url={userData.profilePictureUrl} />
                        </div>
                        <div className='text-center text-lg'>
                            {`${userData.firstname} ${userData.lastname ? userData.lastname : " "}`}
                        </div>
                    </div>
                    <div className='flex flex-col gap-4 flex-1'>
                        <div className='flex justify-evenly md:bg-dark-charcoal px-2 py-1 rounded-lg'>
                            <Counter title='Posts' value={userData.postCount} />
                            <Counter title='Followers' value={userData.followerCount} />
                            <Counter title='Folllowings' value={userData.followingCount} />
                        </div>
                        <div className='p-4 text-sm flex-1 rounded-lg md:bg-dark-charcoal' >{userData.about}</div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProfileSideBar