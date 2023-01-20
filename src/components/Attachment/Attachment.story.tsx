import type { Meta, StoryObj } from '@storybook/react';

import { Attachment } from './index';

const meta: Meta<typeof Attachment> = {
  title: 'Components/Attachment',
  component: Attachment,
  argTypes: {
    url: {
      control: {
        type: 'text',
      },
    },
    isUploading: {
      control: {
        type: 'boolean',
      },
    },
  }
};

export default meta;
type Story = StoryObj<typeof Attachment>;

export const Default: Story = {
  args: {
    // Get url of a random image
    url: 'https://picsum.photos/200',
    isUploading: false,
  },
};

export const IsLoading: Story = {
  args: {
    url: 'https://picsum.photos/200',
    isUploading: true,
  },
};
