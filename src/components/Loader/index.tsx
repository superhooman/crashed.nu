import clsx from 'clsx';
import React, { type HTMLAttributes } from 'react';

import cls from './Loader.module.scss';
import { LoadingIcon } from '../Icon';

interface Props extends HTMLAttributes<HTMLDivElement> {
    size?: number;
    secondary?: boolean;
}

export const Loader = React.forwardRef<HTMLDivElement, Props>(({ size = 15, className, secondary, ...props }, ref) => (
    <div
        {...props}
        ref={ref}
        className={clsx(className, cls.root, secondary && cls.secondary)}
    >
        <LoadingIcon className={cls.icon} height={size} width={size} />
    </div>
));

Loader.displayName = 'Loader';
