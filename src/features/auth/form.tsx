import { Paragraph, Text } from "@src/components/Typography"
import { Container } from "@src/components/Container"
import { Stack } from "@src/components/Stack"
import { Button } from "@src/components/Button"
import { GoogleIcon } from "@src/components/Icon"
import React from "react"
import { signIn } from "next-auth/react"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import Link from "next/link"

export const AuthForm = () => {
    const handleSignIn = React.useCallback(() => {
        signIn('google', {
            callbackUrl: '/schedule',
        });
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
                    <Paragraph bold>Sign in</Paragraph>
                    <Text size="small" color="secondary">Use your @nu.edu.kz Google account</Text>
                </Stack>
                <Button onClick={handleSignIn} fullWidth icon={<GoogleIcon />}>Sign in with Google</Button>
                <Link legacyBehavior href="/">
                    <Button
                        variant="link"
                        icon={<ArrowLeftIcon />}
                        fullWidth
                    >
                        Go back
                    </Button>
                </Link>
            </Stack>
        </Container>
    )
}