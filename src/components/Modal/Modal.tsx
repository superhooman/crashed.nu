import React, { type HTMLAttributes } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import clsx from 'clsx';

import { withClassName } from 'src/components/_hocs/withClassName';

import cls from './Modal.module.scss';
import type { PanInfo } from 'framer-motion';
import { AnimatePresence, motion } from 'framer-motion';

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
  const wrapperRef = React.useRef<HTMLDivElement>(null);
  const [height, setHeight] = React.useState(-1);
  const [windowHeight, setWindowHeight] = React.useState(0);

  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    const resizeObserver = new ResizeObserver((e) => {
      e[0]?.contentRect.height && setHeight(e[0].contentRect.height);
    });
    resizeObserver.observe(wrapper);
    return () => resizeObserver.disconnect();
  }, [open]);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleDragEnd = React.useCallback((_: Event, info: PanInfo) => {
    const half = height > windowHeight ? windowHeight / 2 : height / 2;
    if (info.offset.y > half || info.velocity.y > 1200) {
      props.onOpenChange?.(false);
    }
  }, [height, props, windowHeight]);

  const dragConstraints = React.useMemo(() => {
    if (height > windowHeight) {
      return ({
        top: windowHeight - height - 64,
        bottom: 0,
      });
    }
    return ({
      top: 0,
      bottom: 0,
    });
  }, [height, windowHeight]);

  const initialOffset = React.useMemo(() => {
    if (height <= 0) {
      return 64;
    }
    return height;
  }, [height]);

  return (
    <Dialog.Root
      open={open}
      {...props}
    >
      <AnimatePresence>
        {open ? (
          <Dialog.Portal forceMount className={cls.portal}>
            <Dialog.Overlay forceMount asChild className={clsx(noPrint && cls.noPrint)}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { type: "spring", duration: 0.5 },
                }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className={cls.overlay}
              />
            </Dialog.Overlay>
            <div className={clsx(cls.wrapper, noPrint && cls.noPrint)}>
              <Dialog.Content onOpenAutoFocus={(e) => e.preventDefault()} asChild forceMount>
                  <motion.div
                    initial={{ translateY: initialOffset, opacity: 0 }}
                    animate={{
                      translateY: 0,
                      opacity: 1,
                      transition: { type: "spring", duration: 0.5 },
                    }}
                    drag="y"
                    dragConstraints={dragConstraints}
                    onDragEnd={handleDragEnd}
                    dragElastic={0.8}
                    exit={{ translateY: height, opacity: 0, transition: { duration: 0.2 } }}
                    className={clsx(cls.content, className)}
                    data-width={maxWidth}
                  >
                    <div ref={wrapperRef}>
                      {children}
                    </div>
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
