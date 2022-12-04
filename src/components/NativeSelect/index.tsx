import { ChevronDownIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import React from 'react';

import cls from './NativeSelect.module.scss';

export interface Option {
    label: string;
    value: string;
}

type Props = Omit<React.ComponentProps<'select'>, 'size'> & {
    items: Option[];
    size?: 'default' | 'small';
    label?: string;
    variant?: 'default';
    suffix?: string;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export const NativeSelect = React.forwardRef<HTMLSelectElement, Props>((
    { items, label, icon, suffix, variant = 'default', size = 'default', fullWidth, ...props },
    ref,
) => (
    <div className={clsx(
        cls.root,
        cls[`variant-${variant}`],
        cls[`size-${size}`],
        props.disabled && cls.disabled,
        fullWidth && cls.fullWidth,
    )}>
        {label && <label className={cls.label} htmlFor={props.id}>{label}</label>}
        <div className={cls.content}>
            {icon && <div className={cls.icon}>{icon}</div>}
            {suffix && <div className={cls.suffix}>{suffix}</div>}
            <select className={cls.select} ref={ref} {...props}>
                {items.map(({ value, label }) => (
                    <option key={value} value={value}>{label}</option>
                ))}
            </select>
            <ChevronDownIcon className={cls.chevron} />
        </div>
    </div>
));

NativeSelect.displayName = 'NativeSelect';
