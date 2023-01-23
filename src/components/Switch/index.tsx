import * as SwitchBase from '@radix-ui/react-switch';
import clsx from 'clsx';
import React from 'react';

import { Loader } from '../Loader';
import cls from './Switch.module.scss';

export interface Props extends SwitchBase.SwitchProps {
    isLoading?: boolean;
}

export const Switch: React.FC<Props> = ({
    className,
    isLoading,
    ...props
}) => (
    <SwitchBase.Root className={clsx(cls.root, isLoading && cls.isLoading, className)} {...props}>
        <SwitchBase.Thumb className={cls.thumb}>
            {isLoading ? <Loader /> : null}
        </SwitchBase.Thumb>
    </SwitchBase.Root>
);
