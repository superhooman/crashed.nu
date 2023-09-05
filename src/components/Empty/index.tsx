import { CrumpledPaperIcon } from '@radix-ui/react-icons';
import { Flex, Text } from '@radix-ui/themes';

interface Props {
  title?: string;
}

export const Empty: React.FC<Props> = ({ title = 'Empty' }) => (
    <Flex direction="column" align="center" justify="center" gap="2" py="8" grow="1">
        <CrumpledPaperIcon height={20} width={20} />
        <Text size="2" color="gray">{title}</Text>
    </Flex>
);
