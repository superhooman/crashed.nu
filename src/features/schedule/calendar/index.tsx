import { CalendarIcon, CopyIcon, ExitIcon, FileIcon, HeartIcon, Link1Icon, Share2Icon, UpdateIcon } from "@radix-ui/react-icons";
import { signOut } from "next-auth/react"
import { Button } from "@src/components/Button";
import { Header } from "@src/components/Header";
import { Card as BaseCard } from "@src/components/Card";
import { Stack } from "@src/components/Stack";
import { Calendar } from "@src/components/Calendar";
import type { UserSchedule } from "@src/server/registrar/utils/parse";
import type { Item, WeekDay } from "@src/types/time";
import { trpc } from "@src/utils/trpc";
import React from "react";
import QRCode from "react-qr-code";
import { ScheduleLayout } from "./layout";
import { toast } from "react-hot-toast";
import { Text } from "@src/components/Typography";
import Link from "next/link";
import splitbee from "@splitbee/web";
import { useRouter } from "next/router";
import { Divider } from "@src/components/Divider";
import { ShortModal } from "./components/ShortModal";
import { Adaptive } from "@src/components/Adaptive";
import { Input } from "@src/components/Input";
import { Copyright } from "@src/components/Copyright";
import { ROUTES } from "@src/constants/routes";
import { SubjectCard } from "@src/components/SubjectCard";
import { PrintModal } from "@src/features/printModal";
import { Menu } from "./components/Menu";

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
                    <SubjectCard
                        time={{
                            startTime: item.time.start,
                            endTime: item.time.end,
                        }}
                        abbr={item.id}
                        title={item.title}
                        label={item.label}
                        room={item.cab}
                        color={schedule.preferences.colors[item.id]}
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

// Helps to render everything right
// Making the server render as it is in GMT+6
const getTimeWithTimezoneOffset = () => {
    const current = new Date();
    const timezone = (current.getTimezoneOffset() / 60) + 6;

    return {
        hh: current.getHours() + timezone,
        mm: current.getMinutes(),
    }
}

interface Props {
    schedule: UserSchedule;
    owner: boolean;
    sharable: boolean;
    url: string;
    name: string;
}

export const Schedule: React.FC<Props> = ({ schedule, sharable, owner, url, name }) => {
    const week = React.useMemo(() => getWeek(schedule), [schedule]);
    const [printModal, setPrintModal] = React.useState(false);
    const [shortModal, setShortModal] = React.useState(false);

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
                        <Menu
                            isSharable={sharable}
                            isOwner={owner}
                            url={url}
                            name={name}
                            setPrintModal={setPrintModal}
                            setShortModal={setShortModal}
                        />
                    </Stack>
                </Stack>
            )}
        >
            <Calendar
                week={week}
                showTodayButton
                showCurrentTime
                highlightCurrentDay
                getCurrentTime={getTimeWithTimezoneOffset}
            />
            <PrintModal open={printModal} onOpenChange={setPrintModal} />
            <ShortModal open={shortModal} onOpenChange={setShortModal} />
        </ScheduleLayout>
    )
};
