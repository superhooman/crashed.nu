import { ArrowLeftIcon } from '@radix-ui/react-icons';
import { Button, Flex, Heading, Text } from '@radix-ui/themes';
import Link from 'next/link';

import { Glyph } from '@src/components/Logo';
import { ROUTES } from '@src/constants/routes';

const Page = () => {
    return (
        <Flex direction="column" grow="1" gap="3" justify="center">
            <Flex gap="1" direction="column">
                <Text color="green" mb="2">
                    <Glyph size={24} />
                </Text>
                <Heading size="4">Error</Heading>
                <Text size="2" color="gray" as="p">This schedule is private</Text>
            </Flex>
            <Button asChild>
                <Link href={ROUTES.HOME.get()}>
                    <ArrowLeftIcon />
                    Go home
                </Link>
            </Button>
        </Flex>
    );
};

export default Page;
