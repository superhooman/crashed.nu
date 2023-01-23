import { PieChartIcon } from '@radix-ui/react-icons';

import type { Meta, StoryObj } from '@storybook/react';

import { NativeSelect } from './index';

const meta: Meta<typeof NativeSelect> = {
  title: 'Components/NativeSelect',
  component: NativeSelect,
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

export const Default: Story = {
  args: {
    items: [
      { value: '1', label: 'One' },
      { value: '2', label: 'Two' },
      { value: '3', label: 'Three' },
    ],
    icon: <PieChartIcon />,
    value: '1',
  }
};
