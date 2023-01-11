import type { Meta, StoryObj } from '@storybook/react';

import { GoogleIcon } from './index';

const meta: Meta<typeof GoogleIcon> = {
  title: 'Components/Icon',
  component: GoogleIcon,
  argTypes: {
    size: {
      control: 'number'
    }
  }
};

export default meta;
type Story = StoryObj<typeof GoogleIcon>;

export const Default: Story = {
  args: {
    size: 24, 
  }
};
