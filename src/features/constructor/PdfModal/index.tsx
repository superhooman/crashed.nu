import { HeartIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import React from 'react';

import { Button } from '@src/components/Button';
import { Card } from '@src/components/Card';
import { Stack } from '@src/components/Stack';
import { Paragraph, Text } from '@src/components/Typography';

import cls from './PdfModal.module.scss';

export const PdfModal = () => {
    const [open, setOpen] = React.useState(true);

    return (
        <div data-open={open} className={cls.root}>
            <Card>
                <Stack direction="column" gap={8}>
                    <Paragraph bold>Can&apos;t find your courses?</Paragraph>
                    <Stack direction="column" gap={12} alignItems="start">
                        <Stack direction="column" gap={4}>
                            <Paragraph size="small">Try our experimental registrar pdf source!</Paragraph>
                            <Paragraph size="small">We have <Text bold size="small" color="primary">GEOL 101</Text> there!</Paragraph>
                        </Stack>
                        <Stack alignItems="center" gap={8}>
                            <Link href="/pdf">
                                <Button variant="primary" size="small" icon={<HeartIcon />}>Try it!</Button>
                            </Link>
                            <Button onClick={() => setOpen(false)} size="small">Nah</Button>
                        </Stack>
                    </Stack>
                </Stack>
            </Card>
        </div>
    );
};
