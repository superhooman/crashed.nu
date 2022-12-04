import React from 'react';
import clsx, { type ClassValue } from 'clsx';

export const withClassName = <T extends { className?: string }>(Component: React.ComponentType<T>, classNames: ClassValue) => {
  const ComponentWithClassName = (props: T) => (
    <Component {...props} className={clsx(props.className, classNames)} />
  );

  return ComponentWithClassName;
};
