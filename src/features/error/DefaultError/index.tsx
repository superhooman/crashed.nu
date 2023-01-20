import { Button } from "@src/components/Button"
import { Container } from "@src/components/Container"
import { Glyph } from "@src/components/Header"
import { Stack } from "@src/components/Stack"
import { Paragraph, Text } from "@src/components/Typography"
import { ROUTES } from "@src/constants/routes"
import Link from "next/link"

interface Props {
    title: string;
    text: string;
}

export const DefaultError: React.FC<Props> = ({ title, text }) => {
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
                    <Paragraph bold>{title}</Paragraph>
                    <Text size="small" color="secondary">{text}</Text>
                </Stack>
                <Link legacyBehavior href={ROUTES.HOME.get()}>
                    <Button fullWidth>Go Home</Button>
                </Link>
            </Stack>
        </Container>
    )
}
