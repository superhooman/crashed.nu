import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import { DotFilledIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import React, { type HTMLAttributes, type ReactNode } from 'react';

import { withClassName } from '../_hocs/withClassName';
import { Stack } from '../Stack';

import cls from './Menu.module.scss';
import { config, useTransition, animated } from 'react-spring';

export const withIcon = <T extends { children?: ReactNode }>(Component: React.ComponentType<T>) => {
  const ComponentWithClassName = (props: T & { icon: ReactNode }) => {
    const { icon, children } = props;
    const omittedProps = { ...props };

    delete omittedProps.icon;
    delete omittedProps.children;

    return (
      <Component {...omittedProps}>
        <Stack gap={8} alignItems="center">
          <div className={cls.icon}>{icon}</div>
          <span>{children}</span>
        </Stack>
      </Component>
    );
  };

  return ComponentWithClassName;
};

export const MenuLabel = withClassName(DropdownMenu.Label, cls.label);
export const MenuItem = withClassName(DropdownMenu.Item, cls.item);
export const MenuRightSlot = withClassName((props: HTMLAttributes<HTMLDivElement>) => <div {...props} />, cls.rightSlot);

export const MenuItemWithIcon = withIcon(MenuItem);

export const MenuSeparator = withClassName(DropdownMenu.Separator, cls.separator);

export const MenuCheckboxItem: React.FC<DropdownMenu.DropdownMenuCheckboxItemProps> = ({ className, children, ...props }) => (
  <DropdownMenu.CheckboxItem
    className={clsx(cls.item, cls.checkboxItem, className)}
    {...props}
  >
    <DropdownMenu.ItemIndicator className={cls.indicator}>
      <DotFilledIcon />
    </DropdownMenu.ItemIndicator>
    {children}
  </DropdownMenu.CheckboxItem>
);

export const MenuRadioGroup = withClassName(DropdownMenu.RadioGroup, cls.radioGroup);

export const MenuRadioItem: React.FC<DropdownMenu.DropdownMenuRadioItemProps> = ({ className, children, ...props }) => (
  <DropdownMenu.RadioItem
    className={clsx(cls.item, cls.radioItem, className)}
    {...props}
  >
    <DropdownMenu.ItemIndicator className={cls.indicator}>
      <span>•</span>
    </DropdownMenu.ItemIndicator>
    {children}
  </DropdownMenu.RadioItem>
);

interface Props extends DropdownMenu.DropdownMenuProps {
  content: ReactNode;
  align?: 'start' | 'center' | 'end';
  alignOfset?: number
  sideOfset?: number;
}

const Menu: React.FC<Props> = ({
  content,
  children,
  align = 'center',
  alignOfset = 0,
  sideOfset = 8,
  open: propsOpen,
  onOpenChange: propsOnOpenChange,
  ...props
}) => {
  const [open, setOpen] = React.useState(propsOpen);

  const onOpenChange = React.useCallback((open: boolean) => {
    setOpen(open);
    propsOnOpenChange?.(open);
  }, [propsOnOpenChange]);

  React.useEffect(() => {
    setOpen(propsOpen);
  }, [propsOpen]);

  const transitions = useTransition(open, {
    from: { opacity: 0, y: 48 },
    enter: { opacity: 1, y: 0 },
    leave: { opacity: 0, y: 48 },
    config: config.stiff,
  });

  return (
    <DropdownMenu.Root
      open={open}
      onOpenChange={onOpenChange}
      {...props}
    >
      <DropdownMenu.Trigger asChild>
        {children}
      </DropdownMenu.Trigger>
      {transitions((styles, item) => (
        item ? (
          <DropdownMenu.Portal forceMount>
            <DropdownMenu.Content
              sideOffset={sideOfset}
              alignOffset={alignOfset}
              align={align}
              asChild
              forceMount
            >
              <animated.div style={styles} className={cls.root}>
                {content}
              </animated.div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        ) : null
      ))}
    </DropdownMenu.Root>
  )
};

export default Menu;
