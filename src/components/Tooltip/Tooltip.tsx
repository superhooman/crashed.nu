import * as TooltipBase from '@radix-ui/react-tooltip';

import cls from './Tooltip.module.scss';

export interface TooltipProps extends TooltipBase.TooltipProps {
    content: React.ReactNode;
    arrow?: boolean;
    side?: 'top' | 'right' | 'bottom' | 'left';
    align?: 'start' | 'center' | 'end';
}

const Tooltip: React.FC<TooltipProps> = ({ children, content, arrow, delayDuration = 0, side, align, ...props }) => {
    return (
        <TooltipBase.Provider>
            <TooltipBase.Root delayDuration={delayDuration} {...props}>
                <TooltipBase.Trigger asChild>
                    {children}
                </TooltipBase.Trigger>
                <TooltipBase.Portal>
                    <TooltipBase.Content align={align} side={side} className={cls.content} sideOffset={5}>
                        {content}
                        {arrow ? <TooltipBase.Arrow className="TooltipArrow" /> : null}
                    </TooltipBase.Content>
                </TooltipBase.Portal>
            </TooltipBase.Root>
        </TooltipBase.Provider>
    );
};

export default Tooltip;
