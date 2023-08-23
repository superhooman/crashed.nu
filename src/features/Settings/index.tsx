'use client';

import { CheckCircledIcon } from '@radix-ui/react-icons';
import { Button, Flex, Heading, Link, Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import NextLink from 'next/link';
import React from 'react';

import type { Account } from '@prisma/client';

import { GoogleIcon, MicrosoftIcon } from '@src/components/Icon';
import { Glyph } from '@src/components/Logo';
import { ROUTES } from '@src/constants/routes';


interface Props {
    accounts: Pick<Account, 'provider'>[];
}

export const Settings: React.FC<Props> = ({ accounts }) => {
    const [loading, setLoading] = React.useState(false);

    const providers = accounts.map(({ provider }) => provider);

    const callbackUrl = React.useMemo(() => {
        return ROUTES.SETTINGS.get();
    }, []);

    const handleGoogleSignIn = () => {
        setLoading(true);
        signIn('google', {
            callbackUrl,
        }).finally(() => {
            setLoading(false);
        });
    };

    const handleMicrosoftSignIn = () => {
        setLoading(true);
        signIn('azure-ad', {
            callbackUrl,
        }).finally(() => {
            setLoading(false);
        });
    };

    return (
        <Flex direction="column" grow="1" gap="5" justify="center">
            <Flex gap="1" direction="column">
                <Text color="green" mb="2">
                    <Glyph size={24} />
                </Text>
                <Heading size="4">Settings</Heading>
                <Text size="2" color="gray" as="p">Manage your accounts</Text>
            </Flex>
            <Flex direction="column" gap="2">
                {providers.includes('google') ? (
                    <Button disabled size="3" >
                        <GoogleIcon size={16} />
                        <Text size="2">Google account connected</Text>
                        <CheckCircledIcon />
                    </Button>
                ) : (
                    <Button disabled={loading} onClick={handleGoogleSignIn} size="3" variant="outline" color="gray" radius="large">
                        <GoogleIcon size={16} />
                        <Text size="2">Connect Google account</Text>
                    </Button>
                )}
                {providers.includes('azure-ad') ? (
                    <Button disabled size="3" >
                        <MicrosoftIcon size={16} />
                        <Text size="2">Microsoft account connected</Text>
                        <CheckCircledIcon />
                    </Button>
                ) : (
                    <Button disabled={loading} onClick={handleMicrosoftSignIn} size="3" variant="outline" color="gray" radius="large">
                        <MicrosoftIcon size={16} />
                        <Text size="2">Connect Microsoft account</Text>
                    </Button>
                )}
            </Flex>
            <Flex justify="center">
                <Link color="gray" size="1" asChild>
                    <NextLink href={ROUTES.HOME.get()}>
                        Go back
                    </NextLink>
                </Link>
            </Flex>
        </Flex>
    );
};
