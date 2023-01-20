import type { Meta, StoryObj } from '@storybook/react';

import { Comment } from './index';

const meta: Meta<typeof Comment> = {
  title: 'Components/Comment',
  component: Comment,
};

export default meta;
type Story = StoryObj<typeof Comment>;

export const Default: Story = {
  args: {
    comment: {
      id: '1',
      content: 'Hello from [@adam](https://google.com)',
      postId: '1',
      date: new Date(Date.now() - 5 * 60 * 1000),
      userId: '1',
      deleted: false,
      user: {
        name: 'John Doe',
        email: 'mail@example.com',
        id: '1',
        image: null,
        userType: 'USER',
      }
    }
  }
}
