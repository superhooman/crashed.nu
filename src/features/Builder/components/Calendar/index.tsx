import React from 'react';
import useSWR from 'swr';

import type { SelectedCourse } from '@src/schemas/builder';

import { CalendarView } from '@src/components/CalendarView';
import { getSchedules } from '@src/app/actions/getSchedule';

import { useSchedule } from '../../contexts/schedule';
import { useView } from '../../contexts/view';
import { getWeek } from '../../utils/getWeek';

export const Calendar = () => {
    const { selected } = useSchedule();
    const { schedules } = useView();

    const [enabled, setEnabled] = React.useState(false);

    React.useLayoutEffect(() => {
        setEnabled(true);
    }, []);

    const week = React.useMemo(() => {
        if (!enabled) {
            return undefined;
        };

        return getWeek(selected.map(({ id: courseId, abbr, term, selection }) => (
            {
                id: courseId,
                abbr,
                term,
                selection,
                schedules: schedules[courseId],
            }
        )));
    }, [enabled, selected, schedules]);

    return (
        <>
            <CalendarView week={week} />
            {selected.map(course => (
                <CourseSchedule key={course.id} course={course} />
            ))}
        </>
    );
};

const CourseSchedule: React.FC<{ course: SelectedCourse }> = ({ course }) => {
    const { setSchedules, removeSchedule } = useView();
    const { data } = useSWR({ key: 'schedule', term: course.term, courseId: course.id }, getSchedules, {
        keepPreviousData: false,
        revalidateIfStale: false,
    });

    React.useEffect(() => {
        return () => {
            removeSchedule(course.id);
        };
    }, [course.id, removeSchedule]);

    React.useEffect(() => {
        setSchedules(course.id, data ?? []);
    }, [data, setSchedules, course.id]);

    return null;
};
