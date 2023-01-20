import type { Meta, StoryObj } from '@storybook/react';

import { Post } from './index';

const meta: Meta<typeof Post> = {
  title: 'Components/Post',
  component: Post,
};

export default meta;
type Story = StoryObj<typeof Post>;

export const Default: Story = {
  args: {
    post: {
      id: '1',
      date: new Date(Date.now() - 5 * 60 * 1000),
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
      userId: '1',
      likes: 32,
      subId: '1',
      deleted: false,
      liked: false,
      comments: 2,
      attachments: [
        {
          url: 'https://picsum.photos/600',
          id: '1',
        },
        {
          url: 'https://picsum.photos/800',
          id: '2',
        }
      ],
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
