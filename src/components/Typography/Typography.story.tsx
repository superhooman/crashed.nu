import type { Meta, StoryObj } from '@storybook/react';

import { Text } from './index';

const meta: Meta<typeof Text> = {
  title: 'Components/Typography',
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

export const Default: Story = {
  args: {
    children: 'Hello',
    size: 'default',
    type: 'default',
    align: 'left',
    bold: false,
  },
};

export const Small: Story = {
  args: {
    children: 'I\'m small',
    size: 'small',
    type: 'default',
    align: 'left',
    bold: false,
  },
};

export const Large: Story = {
  args: {
    children: 'I\'m BIG',
    size: 'large',
    type: 'default',
    align: 'left',
    bold: false,
  },
};

export const Color: Story = {
  args: {
    children: 'Colorful',
    size: 'default',
    type: 'default',
    color: 'primary',
    align: 'left',
    bold: false,
  },
};
