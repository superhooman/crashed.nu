import React, { type HTMLAttributes } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';
import { useTransition, animated, config } from 'react-spring';

import { withClassName } from 'src/components/_hocs/withClassName';

import cls from './Modal.module.scss';

interface Props extends Dialog.DialogProps {
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
}

export const ModalTitle = withClassName(Dialog.Title, cls.title);

export const ModalDescription = withClassName(Dialog.Description, cls.description);

export const ModalActions: React.FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...props }) => (
  <div className={clsx(cls.actions, className)} {...props} />
);

const Modal: React.FC<Props> = ({ children, maxWidth = 'sm', open, ...props }) => {
  const transitions = useTransition(open, {
    from: { opacity: 0, y: 48 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 48 },
    config: config.stiff,
  });
  return (
    <Dialog.Root
      open={open}
      {...props}
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
                <animated.div style={styles} className={cls.content} data-width={maxWidth}>
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

export default Modal;
