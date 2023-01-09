import React from 'react';
import clsx from 'clsx';

import cls from './Input.module.scss';

interface BaseProps {
    size?: 'default' | 'small';
    label?: string;
    variant?: 'default';
    fullWidth?: boolean;
    error?: string | boolean;
}

type InputProps = Omit<React.ComponentProps<'input'>, 'type' | 'size'> & BaseProps & {
    type?: 'text' | 'password' | 'number' | 'email' | 'tel' | 'url' | 'date' | 'datetime-local';
    prefix?: string;
    suffix?: React.ReactNode;
    icon?: React.ReactNode;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>((
    { type = 'text', variant = 'default', size = 'default', className, icon = null, prefix, suffix, label, fullWidth, error, ...props },
    ref
) => (
    <div className={clsx(
        cls.root,
        cls[`variant-${variant}`],
        cls[`size-${size}`],
        props.disabled && cls.disabled,
        fullWidth && cls.fullWidth,
        error && cls.error,
    )}>
        {label && <label className={cls.label} htmlFor={props.id}>{label}</label>}
        <div className={cls.content}>
            {icon && <div className={cls.icon}>{icon}</div>}
            {prefix && <div className={cls.prefix}>{prefix}</div>}
            <input
                className={clsx(cls.input, className)}
                ref={ref}
                type={type}
                {...props}
            />
            {suffix && <div className={cls.suffix}>{suffix}</div>}
        </div>
        {typeof error === 'string' ? (
            <span className={cls.error}>{error}</span>
        ) : null}
    </div>
));

Input.displayName = 'Input';

type TextAreaProps = React.ComponentProps<'textarea'> & BaseProps;

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>((
    { variant = 'default', size = 'default', className, label, fullWidth, error, ...props },
    ref
) => (
    <div className={clsx(
        cls.root,
        cls[`variant-${variant}`],
        cls[`size-${size}`],
        props.disabled && cls.disabled,
        fullWidth && cls.fullWidth,
        error && cls.error,
    )}>
        {label && <label className={cls.label} htmlFor={props.id}>{label}</label>}
        <div className={clsx(cls.content, cls.noPadding)}>
            <textarea
                className={clsx(cls.textarea, className)}
                ref={ref}
                {...props}
            />
        </div>
        {typeof error === 'string' ? (
            <span className={cls.error}>{error}</span>
        ) : null}
    </div>
));

TextArea.displayName = 'TextArea';
