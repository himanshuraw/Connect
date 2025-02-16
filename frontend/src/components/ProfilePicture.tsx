import React from 'react'
import { ImageProps } from '../types/props'

const ProfilePicture: React.FC<ImageProps> = ({ url }) => {

    return (
        <div className='w-28 aspect-square rounded-full overflow-hidden bg-graphite-gray'>
            {url ? <img src={url} /> : <div></div>}
        </div>
    )
}

export default ProfilePicture