export interface ProfilePictureProps {
    url: string | null;
}

type IconType = React.FC<React.SVGProps<SVGSVGElement>>;

export interface NavigationLinkProps {
    to: string;
    Icon: IconType;
    ActiveIcon: IconType;
    className?: string;
}