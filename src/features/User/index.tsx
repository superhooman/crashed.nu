'use client';

import { ExitIcon, MixerVerticalIcon } from '@radix-ui/react-icons';
import { Avatar, Button, DropdownMenu, Flex } from '@radix-ui/themes';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

import { ROUTES } from '@src/constants/routes';

interface Props {
    showFallback?: boolean;
}

export const User: React.FC<Props> = ({ showFallback }) => {
    const { data: session, status } = useSession();

    const firstLetter = React.useMemo(() => session?.user?.name?.[0] ?? '', [session]);

    const handleSignOut = React.useCallback(async () => {
        signOut();
    }, []);

    if (status === 'unauthenticated' && showFallback) {
        return (
            <Button>
                <Link href={ROUTES.AUTH.get()}>Sign in</Link>
            </Button>
        );
    }

    if (!session || !session.user) {
        return null;
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <button>
                    <Avatar
                        id={session.user.id}
                        size="2"
                        src={session.user.image ?? undefined}
                        fallback={firstLetter}
                    />
                </button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="end">
                <DropdownMenu.Item asChild>
                    <Link href={ROUTES.SETTINGS.get()}>
                        <Flex gap="2" align="center">
                            <MixerVerticalIcon />
                            Settings
                        </Flex>
                    </Link>
                </DropdownMenu.Item>
                <DropdownMenu.Separator />
                <DropdownMenu.Item onClick={handleSignOut} color="red">
                    <Flex gap="2" align="center">
                        <ExitIcon />
                        Logout
                    </Flex>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};
