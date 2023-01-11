import type { Meta, StoryObj } from '@storybook/react';

import { Header } from './index';

const meta: Meta<typeof Header> = {
  title: 'Components/Header',
  component: Header,
  args: {
    fixed: true,
    sub: 'storybook'
  }
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {};
