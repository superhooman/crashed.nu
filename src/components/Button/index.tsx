import clsx from 'clsx';
import React from 'react';

import { LoadingIcon } from '../Icon';
import cls from './Button.module.scss';

type Props = React.ComponentProps<'button'> & {
    /**
     * Button size
     */
    size?: 'default' | 'small';
    /**
     * Button variant
     */
    variant?: 'primary' | 'default' | 'link' | 'ghost';
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
    /**
     * Link to navigate to
     */
    href?: string;
    /**
     * Disable paddings
     */
    disablePaddings?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement | HTMLAnchorElement, Props>((
    { children, variant = 'default', size = 'default', icon = null, className, fullWidth, isLoading, disabled, disablePaddings, ...props },
    ref,
) => {
    const Element = props.href ? 'a' : 'button';
    return (
        <Element
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            ref={ref}
            className={clsx(
                cls.root,
                cls[`variant-${variant}`],
                cls[`size-${size}`],
                className,
                fullWidth && cls.fullWidth,
                disablePaddings && cls.disablePaddings,
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {Boolean(icon) || isLoading ? (
                <div className={cls.icon}>
                    {isLoading ? <LoadingIcon className={cls.loading} /> : icon}
                </div>
            ) : null}
            <span className={cls.content}>{children}</span>
        </Element>
    );
});

Button.displayName = 'Button';
