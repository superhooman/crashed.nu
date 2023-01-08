import clsx from 'clsx';
import React from 'react';

import cls from './Container.module.scss';

export const Container = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'> & { noHeight?: boolean }>(
    ({ className, noHeight = false, ...props }, ref) => (
        <div ref={ref} className={clsx(cls.root, className, noHeight && cls.noHeight)} {...props} />
    ),
);

Container.displayName = 'Container';
