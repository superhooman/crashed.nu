import { MagnifyingGlassIcon } from '@radix-ui/react-icons';
import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './index';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
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
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    variant: 'default',
    placeholder: 'Input',
  },
};

export const Small: Story = {
  args: {
    size: 'small',
    placeholder: 'Input',
  },
};

export const WithIcon: Story = {
  args: {
    icon: <MagnifyingGlassIcon />,
    placeholder: 'Search',
  },
};

export const WithPrefix: Story = {
  args: {
    prefix: 'crashed.nu/s/',
    placeholder: 'slug'
  },
};

export const WithLabel: Story = {
  args: {
    label: 'First Name',
    placeholder: 'John Doe'
  },
};