import { Flex, Text, TextField } from '@radix-ui/themes';
import React from 'react';

interface Props extends React.ComponentPropsWithRef<typeof TextField.Input> {
    rootProps?: React.ComponentPropsWithRef<typeof TextField.Root>,
    label?: string;
    labelProps?: Omit<React.ComponentPropsWithRef<typeof Text>, 'as'>;
    error?: string;
    icon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, Props>(({
    rootProps,
    label,
    labelProps,
    size = '3',
    radius,
    variant = 'soft',
    color = 'gray',
    error,
    icon,
    ...inputProps
}, ref) => (
    <Flex direction="column" grow="1">
        {label ? (
            <Text color="gray" size="1" mb="1" weight="medium" asChild {...labelProps}>
                <label htmlFor={inputProps.id}>{label}</label>
            </Text>
        ) : null}
        <TextField.Root radius={radius} size={size} variant={variant} color={color} {...rootProps}>
            {icon ? (
                <TextField.Slot>
                    {icon}
                </TextField.Slot>
            ) : null}
            <TextField.Input {...inputProps} ref={ref} />
        </TextField.Root>
        {error ? (
            <Text size="1" color="tomato" mt="1">{error}</Text>
        ) : null}
    </Flex>
));

Input.displayName = 'Input';
