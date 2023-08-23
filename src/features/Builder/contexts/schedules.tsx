import React from 'react';
import { z } from 'zod';
import { nanoid } from 'nanoid';

import { useLocalStorage } from '@src/hooks/useLocalStorage';

interface SchedulesContext {
    schedules: string[];
    selectedSchedule: string;
    addSchedule: () => void;
    selectSchedule: (id: string) => void;
    deleteSchedule: (id: string) => void;
}

export const schedulesContext = React.createContext<SchedulesContext>({} as SchedulesContext);

export const useSchedules = () => React.useContext(schedulesContext);

export const SchedulesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [schedules, setSchedules] = useLocalStorage('schedules', z.string().array().min(1), ['default']);
    const [selectedSchedule, setSelectedSchedule] = useLocalStorage('selectedSchedule', z.string(), 'default');

    const addSchedule = React.useCallback(() => {
        const id = nanoid();
        if (schedules.includes(id)) return;
        setSchedules([...schedules, id]);
        setSelectedSchedule(id);
        return;
    }, [setSchedules, setSelectedSchedule, schedules]);

    const selectSchedule = React.useCallback((id: string) => {
        if (!schedules.includes(id)) return;
        setSelectedSchedule(id);
    }, [setSelectedSchedule, schedules]);

    const deleteSchedule = React.useCallback((id: string) => {
        if (schedules.length === 1) {
            setSchedules(['default']);
            setSelectedSchedule('default');
            return;
        };
        if (!schedules.includes(id)) return;
        setSchedules(schedules.filter(schedule => schedule !== id));
        if (selectedSchedule === id) setSelectedSchedule(schedules[0]);
        return;
    }, [schedules, setSchedules, setSelectedSchedule, selectedSchedule]);

    return (
        <schedulesContext.Provider value={{
            schedules,
            selectedSchedule,
            addSchedule,
            selectSchedule,
            deleteSchedule,
        }}>
            {children}
        </schedulesContext.Provider>
    );
};
