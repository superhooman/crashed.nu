import type { Course, Schedule } from '@src/server/PCC/typings';
import type { ScheduleList, SelectedSchedule } from '../types';

import { getType } from '@src/utils/data/getScheduleTypes';

const dataToText = (data: SelectedSchedule, courses: Course[], scheduleList: ScheduleList) => {
    const courseIdMap = courses.reduce<Record<string, Course>>((dict, course) => {
        dict[course.id] = course;
        return dict;
    }, {});

    const result = Object.entries(data).map(([id, map]) => {
        const abbr = courseIdMap[id]?.abbr;
        const schedule = scheduleList[id];
        
        if (!abbr || !schedule) {
            return null;
        }

        const types = Object.entries(map);

        const typesMap = types.reduce<Record<string, Schedule[]>>((map, [type]) => {
            map[type] = schedule.filter(({ st }) => getType(st) === type);
            return map;
        }, {});

        const items = Object.entries(map).map(([st, index]) => typesMap[st]?.[Number(index)]?.st);

        return `${abbr}: ${items.join(', ')}`;
    });

    return result.join('\n');
};

const dowloadData = (data: string, name: string) => {
    const el = document.createElement('a');
    el.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(data));
    el.setAttribute('download', name);
    el.click();
};

export const exportData = (data: SelectedSchedule, courses: Course[], scheduleList?: ScheduleList) => {
    if (!scheduleList) {
        return;
    }
    const text = dataToText(data, courses, scheduleList);
    dowloadData(text, 'export.txt');
};
