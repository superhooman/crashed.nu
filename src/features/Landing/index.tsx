'use client';

import { CalendarIcon, GitHubLogoIcon, HeartFilledIcon, Pencil2Icon } from '@radix-ui/react-icons';
import { Button, Container, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

import { Glyph } from '@src/components/Logo';
import { ROUTES } from '@src/constants/routes';

const SUPPORT_LINK = 'https://superhooman.lemonsqueezy.com/checkout/buy/4da4bbb2-2250-4085-9bc4-5325ddf04b91';
const GITHUB_LINK = 'https://github.com/superhooman/crashed.nu';

export const Landing = () => {
    return (
        <Container size={{
            initial: '1',
            xs: '2',
            md: '3',
        }} py="9" px="6" grow="1">
            <Flex direction="column" justify="center" height="100%">
                <Flex>
                    <Glyph size={40} />
                </Flex>
                <Heading mt="4" size={{
                    initial: '6',
                    sm: '8',
                    md: '9'
                }} mb={{
                    initial: '3',
                    sm: '4',
                    md: '6',
                }}>Powerful tools for everything related to your schedule</Heading>
                <Text as="p" mb="1" size={{
                    initial: '2',
                    xs: '3',
                    sm: '5',
                    md: '6'
                }}>Become a superhuman with powerful tools at <Text color="green">crashed.nu</Text></Text>
                <Text as="p" mb="1" size={{
                    initial: '2',
                    xs: '3',
                    sm: '5',
                    md: '6'
                }}>Plan a schedule for an upcoming semester. Before registration.</Text>
                <Text as="p" mb="1" size={{
                    initial: '2',
                    xs: '3',
                    sm: '5',
                    md: '6'
                }}>Use your schedule in a convenient way.</Text>
                <Text as="p" mb="1" size={{
                    initial: '2',
                    xs: '3',
                    sm: '5',
                    md: '6'
                }}>Share your schedule with friends.</Text>
                <Text as="p" size={{
                    initial: '2',
                    xs: '3',
                    sm: '5',
                    md: '6'
                }}>Export it as iCal or PDF.</Text>
                <Flex gap={{
                    initial: '3',
                    md: '4'
                }} direction={{
                    initial: 'column',
                    xs: 'row'
                }} mt={{
                    initial: '4',
                    sm: '5',
                    md: '6',
                }}>
                    <Button size={{
                        initial: '3',
                        md: '4'
                    }} asChild>
                        <Link href={ROUTES.SCHEDULE.get()}>
                            <CalendarIcon />
                            Your Schedule
                        </Link>
                    </Button>
                    <Button variant="surface" size={{
                        initial: '3',
                        md: '4'
                    }} asChild>
                        <Link href={ROUTES.BUILDER.get()}>
                            <Pencil2Icon />
                            Build Schedule
                        </Link>
                    </Button>
                </Flex>
                <Flex justify={{
                    initial: 'center',
                    xs: 'start'
                }} mt="9" gap={{
                    initial: '2',
                    md: '3'
                }}>
                    <Button variant="soft" size={{
                        initial: '2',
                        md: '3'
                    }} asChild>
                        <a target="_blank" href={SUPPORT_LINK}>
                            <HeartFilledIcon />
                            Support
                        </a>
                    </Button>
                    <Button variant="soft" size={{
                        initial: '2',
                        md: '3'
                    }} asChild>
                        <a target="_blank" href={GITHUB_LINK}>
                            <GitHubLogoIcon />
                        </a>
                    </Button>
                </Flex>
            </Flex>
        </Container>
    );
};
