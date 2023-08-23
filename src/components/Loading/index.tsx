import { Flex, Text } from '@radix-ui/themes';

import { LoadingIcon } from '../Icon';
import { loader } from './styles.css';

export const Loader: React.FC = () => (
    <LoadingIcon className={loader} size={15} />
);

export const LoadingContainer: React.FC<{ title?: string }> = ({ title = 'Loading...' }) => (
    <Flex direction="column" align="center" gap="2" py="8">
        <Loader />
        <Text size="2" color="gray">{title}</Text>
    </Flex>
);
