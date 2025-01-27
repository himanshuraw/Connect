import React from 'react'
import { BiSearch, BiSolidSearch } from 'react-icons/bi'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { MdExplore, MdOutlineExplore } from 'react-icons/md'
import { Link } from 'react-router'
import NavigationLink from './NavigationLink'
import { CgProfile } from 'react-icons/cg'

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
            <NavigationLink
                to='/'
                ActiveIcon={GoHomeFill}
                Icon={GoHome}
                className='text-4xl'
            />

            <NavigationLink
                to='/search'
                ActiveIcon={BiSolidSearch}
                Icon={BiSearch}
                className='text-4xl'
            />

            <NavigationLink
                to='/explore'
                ActiveIcon={MdExplore}
                Icon={MdOutlineExplore}
                className='text-4xl'
            />

            <NavigationLink
                to='/profile'
                ActiveIcon={CgProfile}
                Icon={CgProfile}
                className='text-4xl'
            />
        </div>
    )
}

export default NavigationBar

