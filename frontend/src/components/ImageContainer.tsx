import React from 'react'
import { ImageProps } from '../types/props'

const ImageContainer: React.FC<ImageProps> = ({ url, alt }) => {
    return (
        <img src={url} alt={alt || "image"} className='w-full h-full object-cover' />
    )
}

export default ImageContainer