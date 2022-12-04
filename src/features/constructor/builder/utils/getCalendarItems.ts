import type { Course, Schedule } from '@src/server/PCC/typings';
import { getType } from '@src/utils/data/getScheduleTypes';
import type { ScheduleList, SelectedCourse, SelectedSchedule } from '../types';

export const getCalendarItems = (selection: SelectedSchedule, courses: Course[], schedule?: ScheduleList): SelectedCourse[] => {
  if (!schedule) {
    return [];
  }
  return courses.map((course) => {
    const courseId = course.id;
    const selected = selection[courseId];
    const schedules = schedule[courseId] || [];

    const types = Object.keys(selected || {});

    return {
      course,
      scheduleList: (types.map((type) => (
        schedules.filter(({ st }) => getType(st) === type)[Number(selected?.[type])]
      )).filter((s) => s) ?? []) as Schedule[],
    };
  });
};
