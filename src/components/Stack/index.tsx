import clsx from 'clsx';
import type { HTMLAttributes, CSSProperties } from 'react';
import React from 'react';

import cls from './Stack.module.scss';

interface Props extends HTMLAttributes<HTMLDivElement> {
  direction?: CSSProperties['flexDirection'];
  alignItems?: CSSProperties['alignItems'];
  justifyContent?: CSSProperties['justifyContent'];
  gap?: number;
  grow?: CSSProperties['flexGrow'];
  fullWidth?: boolean;
  wrap?: boolean;
  minHeight?: number | string;
}

const getMinHeight = (minHeight?: number | string) => {
  if (!minHeight) return 'unset';

  if (typeof minHeight === 'number') {
    return `${minHeight}px`;
  }

  return minHeight;
}

export const Stack = React.forwardRef<HTMLDivElement, Props>(
  ({ className, direction = 'row', alignItems = 'stretch', justifyContent = 'start', gap = 0, grow = 'unset', fullWidth, wrap, minHeight, ...props }, ref) => (
    <>
      <style jsx>{`
      div {
        flex-direction: ${direction};
        align-items: ${alignItems};
        justify-content: ${justifyContent};
        gap: ${gap}px;
        flex-grow: ${grow};
        flex-wrap: ${wrap ? 'wrap' : 'unset'};
        min-height: ${getMinHeight(minHeight)}
      }
    `}</style>
      <div
        className={clsx(className, cls.root, fullWidth && cls.fullWidth)}
        {...props}
        ref={ref}
      />
    </>
  )
);

Stack.displayName = 'Stack';
