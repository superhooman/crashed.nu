import { UpdateIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import React from 'react';

import cls from './Button.module.scss';

type Props = React.ComponentProps<'button'> & {
    /**
     * Button size
     */
    size?: 'default' | 'small';
    /**
     * Button variant
     */
    variant?: 'primary' | 'default' | 'link';
    /**
     * Icon component
     */
    icon?: React.ReactNode;
    /**
     * Makes button fill all available space
     */
    fullWidth?: boolean;
    /**
     * Shows loading indicator instead of icon
     */
    isLoading?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, Props>((
    { children, variant = 'default', size = 'default', icon = null, className, fullWidth, isLoading, disabled, ...props },
    ref,
) => (
    <button
        ref={ref}
        className={clsx(
            cls.root,
            cls[`variant-${variant}`],
            cls[`size-${size}`],
            className,
            fullWidth && cls.fullWidth
        )}
        disabled={disabled || isLoading}
        {...props}
    >
        {Boolean(icon) || isLoading ? (
            <div className={cls.icon}>
                {isLoading ? <UpdateIcon className={cls.loading} /> : icon}
            </div>
        ) : null}
        <span className={cls.content}>{children}</span>
    </button>
));

Button.displayName = 'Button';
