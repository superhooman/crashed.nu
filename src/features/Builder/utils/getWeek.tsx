import type { Item, WeekDay } from '@src/types/time';
import type { SelectedCourse } from '@src/schemas/builder';
import type { Schedule } from '@src/server/PCC/types';

import { getEndTime, getStartTime, parseTime } from '@src/utils/data/time';
import { SubjectCard } from '@src/components/SubjectCard';
import { WEEK_DAYS } from '@src/components/CalendarView';
import { getType } from '@src/utils/data/getScheduleTypes';

export const getWeek = (courses: (SelectedCourse & { schedules?: Schedule[] })[]) => {
    const week: Record<WeekDay, Item[]> = {
        M: [],
        T: [],
        W: [],
        R: [],
        F: [],
        S: []
    };

    courses.forEach(({ abbr, schedules, selection }) => {
        const types = Object.keys(selection);

        ((types.map((type) => (
            schedules?.filter(({ st }) => getType(st) === type)[Number(selection[type])]
          )).filter((s) => s) ?? []) as Schedule[])
            .forEach((schedule) => {
            if (!schedule.days) {
                return;
            }

            const days = schedule.days.trim().split(' ') as WeekDay[];
            const times = schedule.times.split('-');

            if (times.length < 2) {
                return;
            }

            if (!times[0] || !times[1]) {
                return;
            }

            const range = {
                startTime: parseTime(times[0]),
                endTime: parseTime(times[1]),
            };

            const card: Item = {
                content: (
                    <SubjectCard
                        abbr={abbr}
                        title={schedule.st}
                        time={range}
                        label={schedule.faculty}
                        room={schedule.room}
                    />
                ),
                ...range,
            };

            days.forEach((day) => {
                week[day].push(card);
            });
        });
    });

    WEEK_DAYS.forEach(([key]) => {
        week[key].sort((a, b) => {
            const A = {
                start: getStartTime(a),
                end: getEndTime(a),
            };
            const B = {
                start: getStartTime(b),
                end: getEndTime(b),
            };
            if (A.start === B.start) {
                return A.end - B.end;
            }
            return A.start - B.start;
        });
    });
    return week;
};
