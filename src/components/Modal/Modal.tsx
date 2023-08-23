import React, { type HTMLAttributes } from 'react';
import { Drawer } from 'vaul';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'usehooks-ts';

import { withClassName } from '@src/hocs/withClassName';
import { media } from '@src/styles/breakpoints';

import * as cls from './styles.css';

interface Props extends Dialog.DialogProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
  noPrint?: boolean;
  className?: string;
}

export const ModalTitle = withClassName(Dialog.Title, cls.title);

export const ModalDescription = withClassName(Dialog.Description, cls.description);

export const ModalActions: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={clsx(cls.actions, className)} {...props} />
);

const Modal: React.FC<Props> = ({ children, maxWidth = 'sm', open, noPrint, className, ...props }) => {
  const container = React.useRef<HTMLDivElement>(document.querySelector('.radix-themes'));
  const isMobile = useMediaQuery(media.down('sm'));

  if (isMobile) {
    return (
      <Drawer.Root
        open={open}
        {...props}
      >
        <Drawer.Portal container={container.current}>
          <Drawer.Content className={cls.content}>
            {children}
          </Drawer.Content>
          <Drawer.Overlay />
        </Drawer.Portal>
      </Drawer.Root>
    );
  }

  return (
    <Dialog.Root
      open={open}
      {...props}
    >
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount container={container.current}>
            <Dialog.Overlay forceMount asChild className={clsx(noPrint && cls.noPrint)}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { type: 'spring', duration: 0.5 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className={cls.overlay}
              />
            </Dialog.Overlay>
            <div className={clsx(cls.wrapper, noPrint && cls.noPrint)}>
              <Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} asChild forceMount>
                <motion.div
                  initial={{ translateY: '100%', opacity: 0 }}
                  animate={{
                    translateY: 0,
                    opacity: 1,
                    transition: { type: 'spring', duration: 0.5 },
                  }}
                  exit={{ translateY: '100%', opacity: 0, transition: { duration: 0.2 } }}
                  className={clsx(cls.content, className)}
                  data-width={maxWidth}
                >
                  {children}
                </motion.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default Modal;
