'use client';

import { ExclamationTriangleIcon, EyeClosedIcon, EyeOpenIcon, LockClosedIcon, PersonIcon, UpdateIcon } from '@radix-ui/react-icons';
import { Button, Callout, Flex, Heading, Text } from '@radix-ui/themes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { syncRegistrar } from '@src/app/actions/syncRegistrar';
import { Input } from '@src/components/Input';
import { Loader } from '@src/components/Loading';
import { Glyph } from '@src/components/Logo';
import { ROUTES } from '@src/constants/routes';

interface Props {
    isRefetch?: boolean;
}

export const Sync: React.FC<Props> = ({ isRefetch }) => {
    const router = useRouter();
    const [loading, setLoading] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState<string | null>(null);

    const [showPassword, setShowPassword] = React.useState(false);
    const [password, setPassword] = React.useState('');

    const toggleShowPassword = React.useCallback(() => {
        setShowPassword((prev) => !prev);
    }, []);

    const handlePasswordChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }, []);

    const handleSubmit = React.useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage(null);
        syncRegistrar({ password }).then((value) => {
            router.push(ROUTES.SCHEDULE_ID.getWithParams({ id: value }));
        }).catch((err) => {
            setErrorMessage(String(err.message));
        }).finally(() => {
            setLoading(false);
        });
    }, [password, router]);

    const { data: session } = useSession();

    const username = React.useMemo(() => session?.user?.email?.split('@')[0] ?? '...', [session]);

    return (
        <Flex direction="column" grow="1" gap="5" justify="center">
            <Flex gap="1" direction="column">
                <Text color="green" mb="2">
                    <Glyph size={24} />
                </Text>
                <Heading size="4">Almost there!</Heading>
                <Text size="2" color="gray" as="p">Let&apos;s get your schedule from registrar</Text>
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
            <Flex direction="column" gap="3" asChild>
                <form onSubmit={handleSubmit}>
                    <Input size="3" variant="surface" icon={<PersonIcon />} value={username} disabled />
                    <Flex gap="2" align="center">
                        <Input size="3" variant="surface" placeholder="Registrar password" icon={<LockClosedIcon />} type={showPassword ? 'text' : 'password'} value={password} onChange={handlePasswordChange} />
                        <Button type="button" variant="outline" color="gray" size="3" onClick={toggleShowPassword}>
                            {showPassword ? <EyeOpenIcon /> : <EyeClosedIcon />}
                        </Button>
                    </Flex>
                    <Button type="submit" size="3">{loading ? <Loader /> : <UpdateIcon />} Sync with Registrar</Button>
                    {isRefetch && (<Button type="button" variant="soft" color="gray" size="3" asChild>
                        <Link href={ROUTES.SCHEDULE.get()}>Cancel</Link>
                    </Button>)}
                </form>
            </Flex>
            <Flex justify="center">
                <Text size="1" color="gray">We don&apos;t store your credentials. You are sending it to the registrar using our API just to get schedule.</Text>
            </Flex>
        </Flex>
    );
};
