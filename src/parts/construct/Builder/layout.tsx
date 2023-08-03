
import React from 'react';
import { HamburgerMenuIcon } from '@radix-ui/react-icons';

import type { ReactNode } from 'react';

import { Button } from '@src/components/Button';
import { Stack } from '@src/components/Stack';
import { Modal } from '@src/components/Modal';

import cls from './BuilderLayout.module.scss';

interface BuilderLayoutProps {
    side?: ReactNode;
    children?: ReactNode;
    button?: ReactNode;
    hidden?: boolean;
}

export const BuilderLayout: React.FC<BuilderLayoutProps> = ({ side, children, button, hidden }) => {
    const [drawer, setDrawer] = React.useState(false);

    const openDrawer = React.useCallback(() => setDrawer(true), []);

    return (
        <div className={cls.root} style={{
            display: hidden ? 'none' : undefined,
        }}>
            <Modal noPrint open={drawer} onOpenChange={setDrawer}>
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
                </div>
            </main>
        </div>
    );
};
