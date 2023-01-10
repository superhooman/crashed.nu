import Image from 'next/image';
import React from 'react';

import { Container } from '@src/components/Container';
import { Glyph } from '@src/components/Header';
import { Stack } from '@src/components/Stack';
import { Paragraph, Text } from '@src/components/Typography';

import cls from './Landing.module.scss';
import { ROUTES } from '@src/constants/routes';
import Link from 'next/link';
import { Divider } from '@src/components/Divider';
import { Copyright } from '@src/components/Copyright';

export const Landing: React.FC = () => {
    return (
        <Container className={cls.root}>
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={24}
                minHeight="100%"
            >
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={8}
                >
                    <Paragraph align="center" color="primary"><Glyph /></Paragraph>
                    <Paragraph bold align="center" type="primary" size="large">crashed.<Text bold type="primary" color="primary" size="large">nu</Text></Paragraph>
                    <Paragraph align="center" color="secondary">A collection of some useful tools</Paragraph>
                </Stack>
                <Schedule />
                <Constructor />
                <Divider />
                <Copyright />
            </Stack>
        </Container>
    );
};

const Schedule: React.FC = () => (
    <Link href={ROUTES.SCHEDULE}>
        <Stack
            direction="column"
            gap={8}
        >
            <div className={cls.img}>
                <Image
                    src="/img/schedule.png"
                    alt="Schedule"
                    width="280"
                    height="160"
                />
            </div>
            <Text size="small" color="secondary" align="center">Schedule</Text>
        </Stack>
    </Link>
);

const Constructor: React.FC = () => (
    <Link href={ROUTES.CONSTRUCTOR}>
        <Stack
            direction="column"
            gap={8}
        >
            <div className={cls.img}>
                <Image
                    src="/img/constructor.png"
                    alt="Constuctor"
                    width="280"
                    height="160"
                />
            </div>
            <Text size="small" color="secondary" align="center">Constructor</Text>
        </Stack>
    </Link>
);
