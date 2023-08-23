import React from 'react';
import { useSWRConfig } from 'swr';

import type { SelectedCourse} from '@src/schemas/builder';

import { selectedCourseSchema } from '@src/schemas/builder';
import { useLocalStorage } from '@src/hooks/useLocalStorage';

import { useSchedules } from './schedules';
import { saveState } from './cache';

interface ScheduleContext {
    selected: SelectedCourse[];
    selectedCourse: string;
    addCourse: (course: SelectedCourse) => void;
    removeCourse: (id: string) => void;
    selectSection: (id: string, type: string, value: string) => void;
    selectCourse: (id: string) => void;
    toggleCourse: (id: string, term: string, abbr: string) => void;
    clearSelected: () => void;
}

export const scheduleContext = React.createContext<ScheduleContext>({} as ScheduleContext);

export const useSchedule = () => React.useContext(scheduleContext);

export const ScheduleProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { cache } = useSWRConfig();
    const { selectedSchedule } = useSchedules();
    const [selected, setSelected] = useLocalStorage(`${selectedSchedule}.data`, selectedCourseSchema.array(), []);
    const [selectedCourse, setSelectedCourse] = React.useState(() => {
        if (selected.length === 0) return '';
        return selected[0].id;
    });

    React.useEffect(() => {
        if (selected.length === 0) return;
        if (selected.some(course => course.id === selectedCourse)) return;
        setSelectedCourse(selected[0].id);
    }, [selected, selectedCourse, setSelectedCourse]);

    const toggleCourse = React.useCallback((id: string, term: string, abbr: string) => {
        if (selected.some(course => course.id === id)) {
            setSelected(selected.filter(course => course.id !== id));
            return;
        }

        setSelected([...selected, {
            id,
            term,
            abbr,
            selection: {}
        }]);
    }, [selected, setSelected]);

    const addCourse = React.useCallback((course: SelectedCourse) => {
        if (selected.some(selectedCourse => selectedCourse.id === course.id)) return;
        setSelected([...selected, course]);
    }, [setSelected, selected]);

    const removeCourse = React.useCallback((id: string) => {
        setSelected(selected.filter(course => course.id !== id));
    }, [setSelected, selected]);

    const selectSection = React.useCallback((id: string, type: string, value: string) => {
        saveState(cache);
        setSelected(selected.map(course => {
            if (course.id !== id) return course;
            return {
                ...course,
                selection: {
                    ...course.selection,
                    [type]: value,
                }
            };
        }));
    }, [setSelected, selected, cache]);

    const clearSelected = React.useCallback(() => {
        setSelected([]);
    }, [setSelected]);

    return (
        <scheduleContext.Provider value={{
            selected,
            selectedCourse,
            addCourse,
            removeCourse,
            selectSection,
            selectCourse: setSelectedCourse,
            toggleCourse,
            clearSelected,
        }}>
            {children}
        </scheduleContext.Provider>
    );
};
