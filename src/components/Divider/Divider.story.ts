import type { Meta, StoryObj } from '@storybook/react';

import { Divider } from './index';

const meta: Meta<typeof Divider> = {
  title: 'Components/Divider',
  component: Divider,
};

export default meta;
type Story = StoryObj<typeof Divider>;

export const Default: Story = {};
