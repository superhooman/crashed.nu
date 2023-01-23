import type { Meta, StoryObj } from '@storybook/react';

import { Switch } from './index';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    checked: {
      control: 'boolean',
    }
  }
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {};
