import AvatarFallback from 'boring-avatars';
import clsx from 'clsx';

import cls from './Avatar.module.scss';

interface AvatarProps {
    id: string;
    img?: string | null;
    size: number;
    className?: string;
}

const COLORS = [
    '#19c37d',
    '#68de7a',
    '#10a37f',
    '#183d31',
    '#93e69c',
];

export const Avatar: React.FC<AvatarProps> = ({ id, img, size, className }) => {
    return (
        <div style={{
            height: size,
            width: size,
            flexShrink: 0,
        }} className={clsx(cls.root, className)}>
            <div className={cls.image} style={{
                backgroundImage: `url(${img})`,
            }} />
            {!img && (<AvatarFallback size={size} name={id} colors={COLORS} variant="beam" />)}
        </div>
    );
};
