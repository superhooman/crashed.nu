import { Flex, Link, Text } from '@radix-ui/themes';
import NextLink from 'next/link';

interface Props extends React.ComponentProps<typeof Link> {
    href?: string;
    icon?: React.ReactNode;
}

export const LinkButton: React.FC<Props> = ({ children, icon, size = '2', href, ...props }) => {
    const content = (
        <Flex align="center" width="max-content" gap="1">
            {icon}
            <Text size={size}>{children}</Text>
        </Flex>
    );

    return (
        <Link {...props} asChild>
            {href ? (
                <NextLink href={href}>
                    {content}
                </NextLink>
            ) : content}
        </Link>
    );
};
