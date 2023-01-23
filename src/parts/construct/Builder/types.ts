import type { Course, Schedule } from '@src/server/PCC/typings';
import type { Item } from '@src/types/time';

export type ScheduleList = Record<string, Schedule[]>;

export type SelectedSchedule = Record<string, Record<string, string>>;

export interface SelectedCourse {
    course: Course;
    scheduleList: Schedule[];
}

export interface Card extends Item {
    abbr: string;
    title: string;
    capacity: string;
    faculty: string;
    room: string;
    st: string;
    id: string;
}
