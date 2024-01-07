import { Flex, Heading, Link as UILink, Text } from '@radix-ui/themes';
import Link from 'next/link';

import { Glyph } from '@src/components/Logo';
import { ROUTES } from '@src/constants/routes';

export const Privacy = () => {
    return (
        <Flex direction="column" grow="1" gap="5" justify="center">
            <Flex gap="2" direction="column">
                <Text color="green">
                    <Glyph size={24} />
                </Text>
                <Heading size="5">Privacy policy</Heading>
            </Flex>
            <Text size="2" color="gray" as="p">
                crashed.nu is a schedule tool. It does not collect any personal information, except schedule itself.
            </Text>
            <Text size="2" color="gray" as="p">
                The only info about you: name, email, and user id provided by Azure Active Directory.
            </Text>
            <Text size="2" color="gray" as="p">
                We don&apos;t store passwords or any other sensitive information. Even registrar password is not stored.
            </Text>
            <Flex >
                <UILink color="green" size="1" asChild>
                    <Link href={ROUTES.HOME.get()}>Homepage</Link>
                </UILink>
            </Flex>
        </Flex>
    );
};
