import { HeartFilledIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './index';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: {
        type: 'select',
      }
    },
    size: {
      control: {
        type: 'select',
      }
    },
    icon: {
      control: false,
    }
  }
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Button',
  },
};

export const Default: Story = {
  args: {
    variant: 'default',
    children: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    children: 'Button',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <HeartFilledIcon />,
  },
};

export const IsLoading: Story = {
  args: {
    variant: 'primary',
    isLoading: true,
    children: 'Button',
  },
};