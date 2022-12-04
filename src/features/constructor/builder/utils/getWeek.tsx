import type { Item, WeekDay } from '@src/types/time';
import { getEndTime, getStartTime, parseTime } from '@src/utils/data/time';
import type { SelectedCourse } from '../types';
import { WEEK_DAYS } from 'src/features/constructor/builder/components/Calendar';
import { Card } from '@src/features/constructor/builder/components/Card';

export const getWeek = (items: SelectedCourse[]) => {
    const week: Record<WeekDay, Item[]> = {
        M: [],
        T: [],
        W: [],
        R: [],
        F: [],
        S: []
    };

    items.forEach(({ course, scheduleList }) => {
        scheduleList.forEach((schedule) => {
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
                    <Card
                        course={course}
                        schedule={schedule}
                        range={range}
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
