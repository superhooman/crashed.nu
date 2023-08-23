import React from 'react';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex } from '@radix-ui/themes';

import { Drawer } from '@src/components/Drawer';
import { Logo } from '@src/components/Logo';

import { Separator } from './components/Separator';
import * as cls from './style.css';
import { User } from '../User';

interface Props {
    side: React.ReactNode;
}

export const Layout: React.FC<React.PropsWithChildren<Props>> = ({ side, children }) => {
    const [open, setOpen] = React.useState(false);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    return (
        <>
            <Flex gap="0">
                <Flex direction="column" className={cls.side}>
                    <Flex px="4" py="2" justify="between" align="center" className={cls.header}>
                        <Logo />
                        <User showFallback />
                    </Flex>
                    {side}
                </Flex>
                <Box width="100%">
                    <Flex px="4" py="2" justify="between" align="center" className={cls.mobileHeader}>
                        <Logo />
                        <Button size="3" radius="full" variant="soft" onClick={handleOpen}>
                            <HamburgerMenuIcon />
                        </Button>
                    </Flex>
                    {children}
                </Box>
            </Flex>
            <Drawer open={open} onOpenChange={setOpen}>
                <Flex px="4" py="2" align="center" justify="between">
                    <Logo />
                    <Button size="3" radius="full" variant="soft" onClick={() => setOpen(false)}>
                        <Cross1Icon />
                    </Button>
                </Flex>
                <Separator />
                <Box className={cls.menu}>
                    {side}
                    <Flex px="4" py="2" justify="end" align="center" className={cls.mobileFooter}>
                        <User showFallback />
                    </Flex>
                </Box>
            </Drawer>
        </>
    );
};
