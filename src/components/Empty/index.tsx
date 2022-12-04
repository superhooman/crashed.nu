import React, { type ReactNode } from 'react';
import { CrumpledPaperIcon } from '@radix-ui/react-icons';

import { Stack } from '@src/components/Stack';
import { Text } from '@src/components/Typography';

import cls from './Empty.module.scss';

export const Empty: React.FC<{ children?: ReactNode }> = ({ children = 'Empty' }) => (
    <Stack minHeight={200} className={cls.root} alignItems="center" justifyContent="center" direction="column" gap={8}>
        <CrumpledPaperIcon height={24} width={24} />
        <Text size="small">{children}</Text>
    </Stack>
);
