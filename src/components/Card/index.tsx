import clsx from 'clsx';
import React from 'react';

import cls from './Card.module.scss';

type Props = React.ComponentProps<'div'>;

export const Card = React.forwardRef<HTMLDivElement, Props>((
    { className, ...props },
    ref,
) => (
    <div className={clsx(className, cls.root)} ref={ref} {...props} />
));

Card.displayName = 'Card';
