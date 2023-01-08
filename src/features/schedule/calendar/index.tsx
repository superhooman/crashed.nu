import { CalendarIcon, ExitIcon, HeartIcon, Share2Icon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react"
import { Button } from "@src/components/Button";
import { Header } from "@src/components/Header";
import { Card as BaseCard } from "@src/components/Card";
import { Stack } from "@src/components/Stack";
import { Calendar } from "@src/features/constructor/builder/components/Calendar";
import type { UserSchedule } from "@src/server/registrar/utils/parse";
import type { Item, WeekDay } from "@src/types/time";
import { trpc } from "@src/utils/trpc";
import React from "react";
import QRCode from "react-qr-code";
import { Card } from "./components/Card";
import { ScheduleLayout } from "./layout";
import { toast } from "react-hot-toast";
import { Text } from "@src/components/Typography";
import Link from "next/link";
import splitbee from "@splitbee/web";
import { useRouter } from "next/router";

const indexToDay = (i: number): WeekDay => {
    switch (i) {
        case 0:
            return 'M';
        case 1:
            return 'T';
        case 2:
            return 'W';
        case 3:
            return 'R';
        case 4:
            return 'F';
        case 5:
            return 'S';
        default:
            return 'M';
    }
}

const getWeek = (schedule: UserSchedule) => {
    const week: Record<WeekDay, Item[]> = {
        M: [],
        T: [],
        W: [],
        R: [],
        F: [],
        S: []
    };

    schedule.data.forEach((day, i) => {
        day.forEach((item) => {
            const card: Item = {
                content: (
                    <Card
                        item={item}
                        preferences={schedule.preferences}
                    />
                ),
                startTime: item.time.start,
                endTime: item.time.end,
            }
            week[indexToDay(i)].push(card);
        });
    });

    return week;
}

interface Props {
    schedule: UserSchedule;
    owner: boolean;
    sharable: boolean;
    url: string;
}

export const Schedule: React.FC<Props> = ({ schedule, sharable: sharableProp, owner, url }) => {
    const { query } = useRouter();
    const week = React.useMemo(() => getWeek(schedule), [schedule]);
    const [sharable, setSharable] = React.useState(sharableProp);

    const { mutateAsync: share, isLoading: shareLoading } = trpc.registrar.share.useMutation({
        onSuccess: () => {
            setSharable(true);
        },
    });

    const shareLink = React.useCallback(async () => {
        splitbee.track('Share');
        try {
            await navigator.share({
                title: 'Schedule',
                url,
            });
        } catch (_e) {
            navigator.clipboard.writeText(url);
            toast.success('Copied to clipboard!');
        }
    }, [url]);

    const sidebarContent = React.useMemo(() => {
        if (owner) {
            return (
                <Stack direction="column" justifyContent="space-between" fullWidth gap={24}>
                    <Stack
                        direction="column"
                        gap={8}
                        fullWidth
                    >
                        {
                            sharable ? (
                                <>
                                    <BaseCard>
                                        <QRCode
                                            value={url || 'none'}
                                            bgColor="var(--c-bg)"
                                            fgColor="var(--c-text)"
                                            style={{
                                                height: 'auto',
                                                maxWidth: '100%',
                                                minWidth: '100%',
                                                display: 'block',
                                            }}
                                        />
                                    </BaseCard>
                                    <Button onClick={shareLink} icon={<Share2Icon />} fullWidth>Share</Button>
                                </>
                            ) : (
                                <Button
                                    isLoading={shareLoading}
                                    fullWidth
                                    variant="primary"
                                    icon={<Share2Icon />}
                                    onClick={() => share()}
                                >
                                    Share my schedule
                                </Button>
                            )
                        }
                        <Link href={`/api/cal/${query.id}`} download>
                            <Button fullWidth icon={<CalendarIcon />}>Download iCal</Button>
                        </Link>
                    </Stack>
                    <Button onClick={() => signOut({ callbackUrl: '/' })} icon={<ExitIcon />}>Logout</Button>
                </Stack>
            )
        }
        return (
            <Stack direction="column" gap={12} fullWidth>
                <Text size="small" color="secondary">You are viewing someone&apos;s schedule.<br />Sign in to see your own!</Text>
                <Link href="/auth">
                    <Button variant="primary" fullWidth icon={<HeartIcon />}>Sign in</Button>
                </Link>
            </Stack>
        );
    }, [sharable, owner, shareLoading, share, shareLink, url, query.id])

    return (
        <ScheduleLayout
            side={(
                <Stack
                    direction="column"
                    alignItems="stretch"
                    justifyContent="stretch"
                    grow={1}
                    style={{
                        minHeight: 'calc(100% + 16px)',
                        marginTop: -16,
                    }}
                >
                    <Header noContainer />
                    <Stack
                        style={{
                            width: '100%',
                            paddingTop: 16,
                        }}
                        grow={1}
                        alignItems="stretch"
                        justifyContent="stretch"
                    >
                        {sidebarContent}
                    </Stack>
                </Stack>
            )}
        >
            <Calendar week={week} schedule />
        </ScheduleLayout>
    )
};
