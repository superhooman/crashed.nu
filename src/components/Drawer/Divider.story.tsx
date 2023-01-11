import type { Meta } from '@storybook/react';
import React from 'react';
import { Button } from '../Button';
import { Text } from '../Typography';

import { Drawer } from './index';

const meta: Meta<typeof Drawer> = {
  title: 'Components/Drawer',
  component: Drawer,
  args: {
    open: false,
  }
};

export default meta;

export const Default = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open</Button>
      <Drawer open={open} onOpenChange={setOpen}>
        <Text>Wow, a drawer!</Text>
      </Drawer>
    </>
  )
}
