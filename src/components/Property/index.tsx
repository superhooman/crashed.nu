import React from 'react';

import cls from './Property.module.scss';

interface Props {
    label: string;
    value: string;
}

export const Property: React.FC<Props> = ({ label, value }) => (
    <dl className={cls.root}>
        <dt className={cls.label}>
            <span className={cls.span}>{label}</span>
        </dt>
        <dl className={cls.value}>{value}</dl>
    </dl>
);
