import React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useTransition, animated, config } from 'react-spring';

import cls from './Drawer.module.scss';

const Drawer: React.FC<Dialog.DialogProps> = ({ children, open, ...props }) => {
  const transitions = useTransition(open, {
    from: { opacity: 0, x: -48 },
    enter: { opacity: 1, x: 0 },
    leave: { opacity: 0, x: -48 },
    config: config.stiff,
  });

  return (
    <Dialog.Root
      {...props}
      open={open}
    >
      {transitions((styles, item) => (
        item ? (
          <Dialog.Portal forceMount className={cls.portal}>
            <Dialog.Overlay forceMount asChild>
              <animated.div
                style={{
                  opacity: styles.opacity,
                }}
                className={cls.overlay}
              />
            </Dialog.Overlay>
            <div className={cls.wrapper}>
              <Dialog.Content asChild forceMount>
                <animated.div style={styles} className={cls.content}>
                  {children}
                </animated.div>
              </Dialog.Content>
            </div>
          </Dialog.Portal>
        ) : null
      ))}
    </Dialog.Root>
  );
};

export default Drawer;
