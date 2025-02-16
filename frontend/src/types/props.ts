type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

export interface NavigationLinkProps {
    to: string;
    Icon: IconType;
    ActiveIcon: IconType;
    className?: string;
}

export interface CounterProps {
    title: string;
    value: number;
}


export interface ImageProps {
    url?: string;
    alt?: string;
}
