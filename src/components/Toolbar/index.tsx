import clsx from 'clsx';
import React from 'react';
import { Container } from '../Container';

import cls from './Toolbar.module.scss';

export const Toolbar: React.FC<React.ComponentProps<'div'>> = ({ className, children, ...props }) => (
    <div className={clsx(className, cls.root)} {...props}>
        <Container>
            {children}
        </Container>
    </div>
);
