import clsx from 'clsx';
import React from 'react';

import cls from './Container.module.scss';

export const Container = React.forwardRef<HTMLDivElement, React.ComponentProps<'div'>>(
    ({ className, ...props }, ref) => (
        <div ref={ref} className={clsx(cls.root, className)} {...props} />
    ),
);

Container.displayName = 'Container';
