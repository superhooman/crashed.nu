
import React from 'react';
import { CaretSortIcon } from '@radix-ui/react-icons';

import type { ReactNode } from 'react';
import type { Sub } from '@prisma/client';

import { Button } from '@src/components/Button';
import { Stack } from '@src/components/Stack';
import { Modal, ModalTitle } from '@src/components/Modal';
import { SLUG_TO_ICON } from '@src/constants/slugToIcon';

import cls from './SubLayout.module.scss';

interface SubLayoutProps {
    side?: ReactNode;
    header?: ReactNode;
    children?: ReactNode;
    sub?: Sub;
}

export const SubLayout: React.FC<SubLayoutProps> = ({ side, children, header, sub }) => {
    const [drawer, setDrawer] = React.useState(false);

    React.useEffect(() => {
        setDrawer(false);
    }, [sub?.slug]);

    const openDrawer = React.useCallback(() => setDrawer(true), []);

    const subComponent = React.useMemo(() => {
        if (!sub) return null;

        const Icon = SLUG_TO_ICON[sub.slug];

        return (
            <Stack alignItems="center" gap={6}>
                {Icon && <Icon />}
                <span>{sub.name}</span>
            </Stack>
        );
    }, [sub]);

    return (
        <>
            {header}
            <div className={cls.root}>
                <Modal noPrint open={drawer} onOpenChange={setDrawer}>
                    <ModalTitle>Choose a sub</ModalTitle>
                    {side}
                </Modal>
                <aside className={cls.side}>
                    {side}
                </aside>
                <main className={cls.main}>
                    <Stack alignItems="center" justifyContent="space-between" className={cls.header}>
                        <Button fullWidth variant="link" size="small" onClick={openDrawer} icon={<CaretSortIcon />}>{subComponent}</Button>
                    </Stack>
                    <div className={cls.content}>
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
};
