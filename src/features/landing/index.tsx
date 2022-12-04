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

export const Landing: React.FC = () => {
    return (
        <Container className={cls.root}>
            <Stack
                direction="column"
                alignItems="center"
                justifyContent="center"
                gap={32}
            >
                <Stack
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    gap={8}
                >
                    <Paragraph align="center" color="primary"><Glyph /></Paragraph>
                    <Paragraph bold align="center" type="primary" size="large">crashed.<Text bold type="primary" color="primary" size="large">nu</Text></Paragraph>
                    <Paragraph align="center" color="secondary">A collection (soon) of some useful tools</Paragraph>
                </Stack>
                <Constructor />
                <Divider />
                <Text size="small" color="secondary">Made by <a href="https://t.me/iamsuperhooman"><Text  size="small" color="primary">superhooman</Text></a> with ❤️</Text>
            </Stack>
        </Container>
    );
};

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
