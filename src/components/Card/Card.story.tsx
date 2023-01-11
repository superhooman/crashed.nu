import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../Typography';

import { Card } from './index';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: <Text>Wow, a drawer!</Text>,
  },
};
