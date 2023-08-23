import { Box, Container } from '@radix-ui/themes';

import * as cls from './styles.css';

export const FormLayout: React.FC<React.PropsWithChildren> = ({ children }) => (
    <Container className={cls.container} size="1" grow="1" height="100%" px="4">
        <Box className={cls.inner}>
            {children}
        </Box>
    </Container>
);
