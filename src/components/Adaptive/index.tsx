import clsx from "clsx";
import React from "react";

import cls from './Adaptive.module.scss';

interface Props extends React.ComponentProps<'div'> {
    mobile?: React.ReactNode;
    desktop?: React.ReactNode;
}

export const Adaptive: React.FC<Props> = ({ mobile, desktop, className, ...props }) => {
    return (
        <div className={clsx(cls.root, className)} {...props}>
            <div className={cls.mobile}>
                {mobile}
            </div>
            <div className={cls.desktop}>
                {desktop}
            </div>
        </div>
    )
};
