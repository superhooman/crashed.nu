import { Header } from "@src/components/Header";
import { Stack } from "@src/components/Stack";
import { Calendar as CalendarComponent } from "@src/components/Calendar";
import type { UserSchedule } from "@src/server/registrar/utils/parse";
import type { Item, WeekDay } from "@src/types/time";
import React from "react";
import { ScheduleLayout } from "./layout";
import { ShortModal } from "./components/ShortModal";
import { SubjectCard } from "@src/components/SubjectCard";
import { PrintModal } from "@src/features/common/PrintModal";
import { Menu } from "./components/Menu";
import { getTimeWithTimezoneOffset, indexToDay } from "./utils";

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

interface Props {
    schedule: UserSchedule;
    owner: boolean;
    sharable: boolean;
    url: string;
    name: string;
}

export const Calendar: React.FC<Props> = ({ schedule, sharable, owner, url, name }) => {
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
            <CalendarComponent
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
