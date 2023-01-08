import { Paragraph, Text } from "@src/components/Typography"
import { Container } from "@src/components/Container"
import { Glyph } from '@src/components/Header';
import { Stack } from "@src/components/Stack"
import React from "react"
import { Input } from "@src/components/Input"
import { EyeClosedIcon, EyeOpenIcon, LockClosedIcon, PersonIcon, UpdateIcon } from "@radix-ui/react-icons"
import { Button } from "@src/components/Button"
import { trpc } from "@src/utils/trpc";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import splitbee from "@splitbee/web";

export const Registrar = () => {
    const { push } = useRouter();
    const { data: session } = useSession();
    const { mutateAsync, isLoading } = trpc.registrar.sync.useMutation({
        onError: (err) => {
            toast.error(err.message);
        }
    });
    const [pass, setPass] = React.useState<string>('');
    const [showPass, setShowPass] = React.useState<boolean>(false);

    const handlePassChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setPass(e.target.value);
    }, []);

    const handleSync = React.useCallback<React.FormEventHandler<HTMLFormElement>>(async (e) => {
        e.preventDefault();
        await mutateAsync({
            password: pass,
        }).then((id) => {
            splitbee.track('Synced');
            toast.success('Synced!');
            push(`/schedule/${id}`);
        });
    }, [mutateAsync, pass, push]);

    const username = React.useMemo(() => session?.user?.email?.split('@')[0] ?? '...', [session]);

    const toggleShowPass = React.useCallback(() => {
        setShowPass((prev) => !prev);
    }, []);

    return (
        <Container style={{
            maxWidth: 360,
        }}>
            <Stack
                grow={1}
                alignItems="start"
                justifyContent="center"
                direction="column"
                minHeight="100%"
                gap={16}
            >
                <Stack
                    direction="column"
                    gap={8}
                >
                    <Text color="primary">
                        <Glyph size={24} />
                    </Text>
                    <Paragraph bold>Almost there!</Paragraph>
                    <Text size="small" color="secondary">Let&apos;s get your schedule from registrar</Text>
                </Stack>
                <form
                    onSubmit={handleSync}
                    style={{ width: '100%' }}
                >
                    <Stack
                        direction="column"
                        gap={16}
                        grow={1}
                    >
                        <Input value={username} disabled fullWidth icon={<PersonIcon />} />
                        <Stack gap={8}>
                            <Input value={pass} onChange={handlePassChange} placeholder="Registrar password" type={showPass ? 'text' : 'password'} fullWidth icon={<LockClosedIcon />} />
                            <Button onClick={toggleShowPass} type="button" icon={showPass ? <EyeOpenIcon /> : <EyeClosedIcon />} />
                        </Stack>
                        <Button
                            isLoading={isLoading}
                            type="submit"
                            variant="primary"
                            icon={<UpdateIcon />}
                            fullWidth
                            disabled={!pass}
                        >
                            Sync with registrar
                        </Button>
                        <Text size="small" color="secondary">We don&apos;t store your credentials. You are sending it to the registrar using our API just to get schedule.</Text>
                    </Stack>
                </form>
            </Stack>
        </Container>
    )
}
