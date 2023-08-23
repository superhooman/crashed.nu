import { CalendarIcon, CopyIcon, FileIcon, UpdateIcon } from '@radix-ui/react-icons';
import { Avatar, Button, Flex, Separator, Switch, Text } from '@radix-ui/themes';
import Link from 'next/link';
import React from 'react';

import type { User, UserSchedule } from '@prisma/client';

import { toggleSharable } from '@src/app/actions/toggleSharable';
import { Input } from '@src/components/Input';
import { ROUTES } from '@src/constants/routes';
import { PrintModal } from '@src/features/PrintModal';


interface Props {
    schedule: UserSchedule & { user: Pick<User, 'name' | 'image'> };
    isOwner: boolean;
}

export const Menu: React.FC<Props> = ({ schedule, isOwner }) => {
    const [shared, setShared] = React.useState(schedule.shared);
    const [isSharedLoading, setIsSharedLoading] = React.useState(false);

    const [printModal, setPrintModal] = React.useState(false);

    const showPrintModal = React.useCallback(() => {
        setPrintModal(true);
    }, []);

    const handleSharedClick = React.useCallback((value: boolean) => {
        setIsSharedLoading(true);
        toggleSharable({ shared: value }).then((value) => setShared(value)).finally(() => setIsSharedLoading(false));
    }, []);

    const handlePrint = React.useCallback(() => {
        setPrintModal(false);
        setTimeout(() => window.print(), 800);
    }, []);

    const url = React.useMemo(() => {
        if (schedule.short) {
            return ROUTES.SCHEDULE_SHORT.getWithParams({ id: schedule.short }, { full: true });
        }

        return ROUTES.SCHEDULE_ID.getWithParams({ id: schedule.id }, { full: true });
    }, [schedule]);

    const copyLink = React.useCallback(async () => {
        navigator.clipboard.writeText(url);
    }, [url]);

    if (!isOwner) return (
        <Flex direction="column" grow="1" p="4" px="6" gap="4" align="center" justify="center">
            <Avatar
                src={schedule.user.image ?? undefined}
                fallback={schedule.user.name?.[0] ?? ''}
            />
            <Text size="2" align="center" color="gray">Viewing {schedule.user.name}&apos;s schedule</Text>
        </Flex>
    );

    return (
        <Flex direction="column" grow="1" p="4" gap="4">
            <PrintModal open={printModal} onOpenChange={setPrintModal} onPrint={handlePrint} />
            <Flex direction="row" align="center" justify="between" gap="2">
                <Text size="1" color="gray">Share your schedule</Text>
                <Switch radius="full" checked={shared} onCheckedChange={handleSharedClick} disabled={isSharedLoading} />
            </Flex>
            {shared ? (
                <Flex align="center" gap="2">
                    <Input size="2" value={url} readOnly />
                    <Button onClick={copyLink}><CopyIcon /></Button>
                </Flex>
            ) : null}
            <Flex direction="column" gap="3">
                <Button onClick={showPrintModal} variant="surface">
                    <FileIcon />
                    Export PDF
                </Button>
                <Button asChild variant="surface">
                    <a download="export.ics" href={ROUTES.ICAL.get({ query: { id: schedule.id } })}>
                        <CalendarIcon />
                        Download iCal
                    </a>
                </Button>
                <Separator size="4" />
                <Button asChild variant="soft">
                    <Link href={ROUTES.SCHEDULE.get({ query: { refetch: 1 } })}>
                        <UpdateIcon />
                        Resync schedule
                    </Link>
                </Button>
            </Flex>
        </Flex>
    );
};
