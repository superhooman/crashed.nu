import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

import type { Metadata } from 'next';

import { Glyph } from '@src/components/Logo';
import { ROUTES } from '@src/constants/routes';
import { FormLayout } from '@src/layouts/Form';

export const metadata: Metadata = {
    title: '404 | crashed.nu',
    description: 'Something went wrong?',
};

const Page = () => {
    return (
        <FormLayout>
            <Flex direction="column" grow="1" gap="3" justify="center">
                <Flex gap="1" direction="column">
                    <Text color="green" mb="2">
                        <Glyph size={24} />
                    </Text>
                    <Heading size="4">404</Heading>
                    <Text size="2" color="gray" as="p">Something went wrong?</Text>
                </Flex>
                <Button asChild>
                    <Link href={ROUTES.HOME.get()}>
                        <ArrowLeftIcon />
                        Go home
                    </Link>
                </Button>
            </Flex>
        </FormLayout>
    );
};

export default Page;
