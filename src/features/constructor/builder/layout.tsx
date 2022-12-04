
import type { ReactNode } from 'react';
import React from 'react';

import { Drawer } from '@src/components/Drawer';
import { Button } from '@src/components/Button';
import { Stack } from '@src/components/Stack';

import cls from './BuilderLayout.module.scss';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';
import { Modal } from '@src/components/Modal';

interface BuilderLayoutProps {
    side?: ReactNode;
    children?: ReactNode;
    button?: ReactNode;
}

export const BuilderLayout: React.FC<BuilderLayoutProps> = ({ side, children, button }) => {
    const [drawer, setDrawer] = React.useState(false);

    const openDrawer = React.useCallback(() => setDrawer(true), []);
    const closeDrawer = React.useCallback(() => setDrawer(false), []);

    return (
        <div className={cls.root}>
            <Modal open={drawer} onOpenChange={setDrawer}>
                {side}
            </Modal>
            <aside className={cls.side}>
                {side}
            </aside>
            <main className={cls.main}>
                <div className={cls.content}>
                    <Stack alignItems="center" justifyContent="space-between" className={cls.header}>
                        <Button variant="link" onClick={openDrawer} icon={<HamburgerMenuIcon />}>Courses</Button>
                        {button}
                    </Stack>
                    {children}
                    {/* <Footer /> */}
                </div>
            </main>
        </div>
    );
};
