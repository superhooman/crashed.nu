import { Select as SelectBase } from '@radix-ui/themes';
import React from 'react';

import type { selectTriggerPropDefs } from '@radix-ui/themes';

export interface Option {
    label: React.ReactNode;
    value: string;
}

interface Props extends React.ComponentProps<typeof SelectBase.Root> {
    options: Option[];
    placeholder?: string;
    variant?: (typeof selectTriggerPropDefs.variant.values)[number];
    color?:  (typeof selectTriggerPropDefs.color.values)[number];
    radius?:  (typeof selectTriggerPropDefs.radius.values)[number];
    className?: string;
}

export const Select: React.FC<Props> = ({
    placeholder,
    options,
    variant = 'soft',
    color = 'gray',
    radius,
    className,
    ...props
}) => {
    return (
        <SelectBase.Root {...props}>
            <SelectBase.Trigger radius={radius} className={className} variant={variant} color={color} placeholder={placeholder} />
            <SelectBase.Content position="popper">
                {options.map((option) => (
                    <SelectBase.Item value={option.value} key={option.value}>{option.label}</SelectBase.Item>
                ))}
            </SelectBase.Content>
        </SelectBase.Root>
    );
};
