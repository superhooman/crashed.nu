import type { Meta } from '@storybook/react';
import type { ComponentProps } from 'react';
import { Stack } from '../Stack';

import { Loader } from './index';

const meta: Meta<typeof Loader> = {
  title: 'Components/Loader',
  component: Loader,
};

export default meta;

export const Default = (args: ComponentProps<typeof Loader>) => (
  <Stack alignItems="center" justifyContent="start">
    <Loader {...args} />
  </Stack>
)
