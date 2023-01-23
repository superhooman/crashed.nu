import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';

import cls from './Drawer.module.scss';

const Drawer: React.FC<Dialog.DialogProps> = ({ children, open, ...props }) => {

  return (
    <Dialog.Root
      {...props}
      open={open}
    >
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount className={cls.portal}>
            <Dialog.Overlay forceMount asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { type: 'spring', duration: 0.5 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.1 } }}
                className={cls.overlay}
              />
            </Dialog.Overlay>
            <div className={cls.wrapper}>
              <Dialog.Content asChild forceMount>
                <motion.div
                  initial={{ translateX: -24, opacity: 0 }}
                  animate={{
                    translateX: 0,
                    opacity: 1,
                    transition: { type: 'spring', duration: 0.5 },
                  }}
                  exit={{ translateX: -24, opacity: 0, transition: { duration: 0.1 } }}
                  className={cls.content}
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

export default Drawer;
