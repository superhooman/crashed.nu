import * as Dialog from '@radix-ui/react-dialog';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import clsx from 'clsx';

import * as cls from './styles.css';

interface Props extends Dialog.DialogProps {
    className?: string;
}

const Drawer: React.FC<Props> = ({ children, open, className, ...props }) => {
    const container = React.useRef<HTMLDivElement>(document.querySelector('.radix-themes'));

    return (
        <Dialog.Root
            open={open}
            {...props}
        >
            <AnimatePresence>
                {open ? (
                    <Dialog.Portal forceMount container={container.current}>
                        <Dialog.Overlay forceMount asChild>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ type: 'tween', duration: 0.2 }}
                                className={cls.overlay}
                            />
                        </Dialog.Overlay>
                        <Dialog.Content forceMount asChild>
                            <motion.div
                                initial={{ translateX: '-100%' }}
                                animate={{ translateX: '0%' }}
                                exit={{ translateX: '-100%' }}
                                transition={{ type: 'tween', duration: 0.2 }}
                                className={clsx(cls.content, className)}
                            >
                                <div className={cls.inner}>
                                    {children}
                                </div>
                            </motion.div>
                        </Dialog.Content>
                    </Dialog.Portal>
                ) : null}
            </AnimatePresence>
        </Dialog.Root>
    );
};

export default Drawer;
