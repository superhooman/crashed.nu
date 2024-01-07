'use client';

import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Button, Callout, Flex, Heading, Link, Text } from '@radix-ui/themes';
import { signIn } from 'next-auth/react';
import React from 'react';
import NextLink from 'next/link';

import { GoogleIcon, MicrosoftIcon } from '@src/components/Icon';
import { Glyph } from '@src/components/Logo';
import { ROUTES } from '@src/constants/routes';

interface Props {
    callbackUrl?: string;
    error?: string;
}

const DEFAULT_ERROR = 'Sign in failed. Try again later.';

const ERRROS: Record<string, string> = {
    'Signin': 'You need to sign in to view this page.',
    'OAuthAccountNotLinked': 'Seems like you used a different sign in method. Sign in with the same account you used originally.',
};

export const Auth: React.FC<Props> = ({ callbackUrl, error }) => {
    const errorMessage = error ? ERRROS[error] ?? DEFAULT_ERROR : null;
    const [loading, setLoading] = React.useState(false);

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
                <Heading size="4">Sign in</Heading>
                <Text size="2" color="gray" as="p">Use your @nu.edu.kz account</Text>
            </Flex>
            {errorMessage && (
                <Callout.Root color="red" size="1">
                    <Callout.Icon>
                        <ExclamationTriangleIcon />
                    </Callout.Icon>
                    <Callout.Text>
                        {errorMessage}
                    </Callout.Text>
                </Callout.Root>
            )}
            <Flex direction="column" gap="2">
                <Button disabled={loading} onClick={handleGoogleSignIn} size="3" variant="outline" color="gray" radius="large">
                    <GoogleIcon size={16} />
                    <Text size="2">Sign in with Google</Text>
                </Button>
                <Button disabled={loading} onClick={handleMicrosoftSignIn} size="3" variant="outline" color="gray" radius="large">
                    <MicrosoftIcon size={16} />
                    <Text size="2">Sign in with Microsoft</Text>
                </Button>
            </Flex>
            <Flex justify="center">
                <Link color="gray" size="1" asChild>
                    <NextLink href={ROUTES.PRIVACY.get()}>Privacy policy</NextLink>
                </Link>
            </Flex>
        </Flex>
    );
};
