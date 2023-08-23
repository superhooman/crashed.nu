'use client';

import { SchedulesProvider } from './contexts/schedules';
import { ScheduleProvider } from './contexts/schedule';
import { SemestersProvider } from './contexts/semesters';
import { CacheProvider } from './contexts/cache';
import { Layout } from './layout';
import { Menu } from './components/Menu';
import { ScheduleSelects } from './components/ScheduleSelects';
import { ViewProvider } from './contexts/view';
import { Calendar } from './components/Calendar';

interface Semester {
    value: string;
    label: string;
}

interface Builder {
    semesters: Semester[];
}

export const Builder: React.FC<Builder> = ({ semesters }) => (
    <CacheProvider>
        <SemestersProvider semesters={semesters}>
            <SchedulesProvider>
                <ScheduleProvider>
                    <ViewProvider>
                        <Layout side={<Menu />} top={<ScheduleSelects />}>
                            <Calendar />
                        </Layout>
                    </ViewProvider>
                </ScheduleProvider>
            </SchedulesProvider>
        </SemestersProvider>
    </CacheProvider>
);
