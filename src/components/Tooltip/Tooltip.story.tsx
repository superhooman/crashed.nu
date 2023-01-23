import type { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';

import { Tooltip } from './index';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip',
  component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  args: {
    content: 'Tooltip',
    children: <Button>Hover me</Button>,
  },
};
