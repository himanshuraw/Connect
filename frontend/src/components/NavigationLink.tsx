import React from 'react'
import { Link, useLocation } from 'react-router'
import { NavigationLinkProps } from '../types/props';

const NavigationLink: React.FC<NavigationLinkProps> = ({ to, Icon, ActiveIcon, className }) => {
    const location = useLocation();
    const isActive = location.pathname === to;
    return (
        <Link to={to}>
            {isActive
                ? <ActiveIcon className={`${className} text-primary`} />
                : <Icon className={className} />
            }
        </Link>
    )
}

export default NavigationLink