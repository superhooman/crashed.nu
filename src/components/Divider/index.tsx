import clsx from 'clsx';

import cls from './Divider.module.scss';

type Props = React.ComponentProps<'div'>;

export const Divider: React.FC<Props> = ({ className, children, ...props }) => (
    <div role="separator" className={clsx(cls.root, className)} {...props}>
        {children ? <span className={cls.content}>{children}</span> : null}
    </div>
);
