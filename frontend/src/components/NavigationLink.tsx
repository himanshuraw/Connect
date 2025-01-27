import React from 'react'
import { Link, useLocation } from 'react-router'

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

interface INavigationLinkProps {
    to: string;
    Icon: IconType;
    ActiveIcon: IconType;
    className?: string;
}

const NavigationLink: React.FC<INavigationLinkProps> = ({ to, Icon, ActiveIcon, className }) => {
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