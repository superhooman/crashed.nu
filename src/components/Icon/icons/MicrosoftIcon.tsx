import { BaseSvg, type IconProps } from '..';

export const MicrosoftIcon: React.FC<IconProps> = ({ size, ...props }) => (
    <BaseSvg
        size={size}
        originalSize={16}
        {...props}
    >
        <path fill="#FF5722" d="M0 0h7.5v7.5H0z"/>
        <path fill="#4CAF50" d="M8.5 0H16v7.5H8.5z"/>
        <path fill="#03A9F4" d="M0 8.5h7.5V16H0z"/>
        <path fill="#FFC107" d="M8.5 8.5H16V16H8.5z"/>
    </BaseSvg>
);
