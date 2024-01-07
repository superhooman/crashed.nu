import React from 'react';
import { Cross1Icon, HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Box, Button, Flex } from '@radix-ui/themes';

import { Drawer } from '@src/components/Drawer';
import { Logo } from '@src/components/Logo';
import { breakpoints } from '@src/styles/breakpoints';

import { Separator } from './components/Separator';
import * as cls from './style.css';

interface Props {
    side: React.ReactNode;
    top: React.ReactNode;
}

export const Layout: React.FC<React.PropsWithChildren<Props>> = ({ side, top, children }) => {
    const [open, setOpen] = React.useState(false);

    React.useEffect(() => {
        const onResize = () => {
            if (window.innerWidth > breakpoints.sm) {
                setOpen(false);
            }
        };

        window.addEventListener('resize', onResize);

        return () => window.removeEventListener('resize', onResize);
    }, []);

    const handleOpen = React.useCallback(() => {
        setOpen(true);
    }, [setOpen]);

    return (
        <>
            <Flex gap="0">
                <Flex direction="column" className={cls.side}>
                    <Flex px="4" py="2" justify="between" align="center" className={cls.header}>
                        <Logo />
                    </Flex>
                    {side}
                </Flex>
                <Box width="100%">
                    <Flex px="4" py="2" justify="between" align="center" className={cls.mobileHeader}>
                        <Logo />
                        <Button size="3" variant="soft" onClick={handleOpen}>
                            <HamburgerMenuIcon />
                        </Button>
                    </Flex>
                    <Flex px="3" align="center" className={cls.top}>
                        {top}
                    </Flex>
                    <Separator />
                    {children}
                </Box>
            </Flex>
            <Drawer open={open} onOpenChange={setOpen}>
                <Flex px="4" py="2" align="center" justify="between">
                    <Logo />
                    <Button size="3" variant="soft" onClick={() => setOpen(false)}>
                        <Cross1Icon />
                    </Button>
                </Flex>
                <Separator />
                <Box className={cls.menu}>
                    {side}
                </Box>
            </Drawer>
        </>
    );
};
