import type { Meta, StoryObj } from '@storybook/react';

import { User } from './index';

const meta: Meta<typeof User> = {
  title: 'Components/User',
  component: User,
};

export default meta;
type Story = StoryObj<typeof User>;

export const Default: Story = {
  args: {
    user: {
      name: 'John Doe',
      email: 'mail@example.com',
      id: '1',
      userType: 'USER',
      image: null,
    }
  }
};
