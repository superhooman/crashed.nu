import type { Meta, StoryObj } from '@storybook/react';

import { CircularProgress } from './index';

const meta: Meta<typeof CircularProgress> = {
  title: 'Components/CircularProgress',
  component: CircularProgress,
};

export default meta;
type Story = StoryObj<typeof CircularProgress>;

export const Default: Story = {
  args: {
    value: 72,
  },
};
