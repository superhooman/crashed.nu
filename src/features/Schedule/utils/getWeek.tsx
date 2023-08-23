import type { UserSchedule } from '@src/server/registrar/utils/parse';
import type { Item, WeekDay } from '@src/types/time';

import { SubjectCard } from '@src/components/SubjectCard';

import { indexToDay } from '.';

export const getWeek = (schedule: UserSchedule) => {
    const week: Record<WeekDay, Item[]> = {
        M: [],
        T: [],
        W: [],
        R: [],
        F: [],
        S: []
    };

    schedule.data?.forEach((day, i) => {
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
            };
            week[indexToDay(i)].push(card);
        });
    });

    return week;
};
