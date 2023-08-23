import React from 'react';

import type { Text } from '@radix-ui/themes';

import * as cls from './styles.css';

interface Props {
    label: string;
    value: string;
    size?: React.ComponentProps<typeof Text>['size'];
}

export const Property: React.FC<Props> = ({ label, value, size = '1' }) => (
    <dl className={cls.root} style={{
        '--font-size': `var(--font-size-${size})`
    } as React.CSSProperties}>
        <dt className={cls.label}>
            <span className={cls.span}>{label}</span>
        </dt>
        <dl className={cls.value}>{value}</dl>
    </dl>
);
