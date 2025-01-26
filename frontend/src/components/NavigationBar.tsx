import React from 'react'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { IoSearchOutline } from 'react-icons/io5'
import { MdExplore, MdOutlineExplore } from 'react-icons/md'

const NavigationBar: React.FC = () => {
    return (
        <div
            className="
            flex flex-col
            bg-background-100
            rounded-md
            w-full
            p-3
            gap-5
            md:order-2
            md:h-full md:w-auto
            ">
            <div>
                {/* <GoHome className='text-4xl' /> */}
                <GoHomeFill className='text-4xl' />
            </div>

            <div>
                <IoSearchOutline className='text-4xl' />
            </div>

            <div>
                <MdOutlineExplore className='text-4xl' />
                {/* <MdExplore className='text-4xl' /> */}

            </div>
        </div>
    )
}

export default NavigationBar

