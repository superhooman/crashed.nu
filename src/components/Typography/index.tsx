import clsx from 'clsx';
import React from 'react';

import cls from './Typography.module.scss';

interface TextProps {
    size?: 'small' | 'default' | 'large';
    color?: 'default' | 'primary' | 'secondary';
    type?: 'default' | 'primary';
    align?: 'left' | 'center';
    bold?: boolean;
    overflow?: boolean;
}

interface TitleProps {
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    align?: 'left' | 'center';
    gutterBottom?: boolean;
}

export const Text: React.FC<React.ComponentProps<'span'> & TextProps & { block?: boolean }> = ({ className, size = 'default', color = 'default', align = 'left', type = 'default', block, bold, overflow, ...props }) => (
    <span className={clsx(className, cls[`size-${size}`], cls[`color-${color}`], cls[`type-${type}`], cls[`align-${align}`], block && cls.block, bold && cls.bold, overflow && cls.overflow)} {...props} />
);

export const TextSkeleton: React.FC<React.ComponentProps<'span'> & TextProps & { block?: boolean }> = ({ className, size = 'default', color = 'default', align = 'left', type = 'default', block, bold, overflow, ...props }) => (
    <span className={clsx(className, cls[`size-${size}`], cls[`color-${color}`], cls[`type-${type}`], cls[`align-${align}`], block && cls.block, bold && cls.bold, overflow && cls.overflow)}>
        <span className={cls.skeleton} />
    </span>
);

export const Title: React.FC<React.ComponentProps<'h1'> & TitleProps> = ({ className, level = 1, align = 'left', gutterBottom = false, ...props }) => {
    const Element = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

    return (<Element className={clsx(className, cls[`align-${align}`], cls.title, gutterBottom && cls.gutterBottom)} {...props} />)
}

export const Paragraph: React.FC<React.ComponentProps<'p'> & TextProps & { gutterBottom?: boolean }> = ({ className, size = 'default', color = 'default', align = 'left', type = 'default', bold, overflow, gutterBottom = false, ...props }) => (
    <p className={clsx(className, cls[`size-${size}`], cls[`color-${color}`], cls[`type-${type}`], cls[`align-${align}`], bold && cls.bold, overflow && cls.overflow, gutterBottom && cls.gutterBottom)} {...props} />
);
