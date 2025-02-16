import React from 'react'
import Posts from '../components/Posts';
import ProfileSideBar from '../components/ProfileSideBar';

const Profile: React.FC = () => {

    return (
        <div className='flex flex-col md:flex-row h-full'>
            <div className='p-4 md:w-80'>
                <ProfileSideBar />
            </div>
            <div className='flex-1 overflow-y-auto p-4'>
                <Posts />
            </div>
        </div>
    )
}

export default Profile