import React from 'react';

import type { Schedule } from '@src/server/PCC/types';

interface ViewContext {
    schedules: Record<string, Schedule[]>;
    setSchedules: (id: string, schedules: Schedule[]) => void;
    removeSchedule: (id: string) => void;
}

export const viewContext = React.createContext<ViewContext>({} as ViewContext);

export const useView = () => React.useContext(viewContext);

export const ViewProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [schedules, setSchedules] = React.useState<Record<string, Schedule[]>>({});

    const setSchedule = React.useCallback((id: string, schedule: Schedule[]) => {
        setSchedules(schedules => ({ ...schedules, [id]: schedule }));
    }, []);

    const removeSchedule = React.useCallback((id: string) => {
        setSchedules(schedules => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { [id]: _, ...rest } = schedules;
            return rest;
        });
    }, []);

    return (
        <viewContext.Provider value={{
            schedules,
            setSchedules: setSchedule,
            removeSchedule,
        }}>
            {children}
        </viewContext.Provider>
    );
};
