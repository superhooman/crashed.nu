import type { Meta, StoryObj } from '@storybook/react';

import { Copyright } from './index';

const meta: Meta<typeof Copyright> = {
  title: 'Components/Copyright',
  component: Copyright,
};

export default meta;
type Story = StoryObj<typeof Copyright>;

export const Default: Story = {};
