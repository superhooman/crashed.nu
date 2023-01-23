import type { Meta, StoryObj } from '@storybook/react';

import { Calendar } from './index';

const meta: Meta<typeof Calendar> = {
  title: 'Components/Calendar',
  component: Calendar,
  args: {
    getCurrentDay() {
        return 'M';
    },
    getCurrentTime() {
        return {
            hh: 9,
            mm: 41,
        };
    }
  }
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {

};
