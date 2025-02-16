import React from 'react'
import { BiSearch, BiSolidSearch } from 'react-icons/bi'
import { GoHome, GoHomeFill } from 'react-icons/go'
import { MdExplore, MdOutlineExplore } from 'react-icons/md'
import NavigationLink from './NavigationLink'
import { CgProfile } from 'react-icons/cg'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

const NavigationBar: React.FC = () => {
    const username = useSelector((state: RootState) => state.auth.user?.username);
    return (
        <div
            className="
            flex 
            bg-dark-charcoal
            rounded-md
            w-full
            p-3
            gap-5
            justify-evenly
            md:justify-start
            md:flex-col
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
                to={`/${username}`}
                ActiveIcon={CgProfile}
                Icon={CgProfile}
                className='text-4xl'
            />
        </div>
    )
}

export default NavigationBar

