
import React from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import type { ReactNode } from 'react';

import { Button } from '@src/components/Button';
import { Stack } from '@src/components/Stack';
import { Modal } from '@src/components/Modal';

import cls from './ScheduleLayout.module.scss';

interface ScheduleLayoutProps {
    side?: ReactNode;
    children?: ReactNode;
    button?: ReactNode;
}

export const ScheduleLayout: React.FC<ScheduleLayoutProps> = ({ side, children, button }) => {
    const [drawer, setDrawer] = React.useState(false);

    const openDrawer = React.useCallback(() => setDrawer(true), []);

    return (
        <div className={cls.root}>
            <Modal noPrint open={drawer} onOpenChange={setDrawer}>
                {side}
            </Modal>
            <aside className={cls.side}>
                {side}
            </aside>
            <main className={cls.main}>
                <div className={cls.content}>
                    <Stack alignItems="center" justifyContent="space-between" className={cls.header}>
                        <Button variant="link" onClick={openDrawer} icon={<HamburgerMenuIcon />}>Menu</Button>
                        {button}
                    </Stack>
                    {children}
                </div>
            </main>
        </div>
    );
};
