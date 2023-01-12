import clsx from 'clsx';

import cls from './Divider.module.scss';

type Props = React.ComponentProps<'div'> & {
    noMargin?: boolean;
};

export const Divider: React.FC<Props> = ({ className, children, noMargin, ...props }) => (
    <div role="separator" className={clsx(cls.root, noMargin && cls.noMargin, className)} {...props}>
        {children ? <span className={cls.content}>{children}</span> : null}
    </div>
);
