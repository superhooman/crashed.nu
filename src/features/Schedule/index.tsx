'use client';
import React from 'react';
import dynamic from 'next/dynamic';

import type { User, UserSchedule } from '@prisma/client';
import type { UserSchedule as ScheduleParsed } from '@src/server/registrar/utils/parse';

import { Layout } from './layout';
import { Calendar } from './components/Calendar';
import { Menu } from './components/Menu';


const MicrosoftModal = dynamic(() => import('./components/MicrosoftModal').then((mod) => mod.MicrosoftModal), {
    ssr: false,
});

interface ScheduleProps {
    isOwner: boolean;
    hasMicrosoft?: boolean;
    schedule: UserSchedule & { user: Pick<User, 'name' | 'image'> };
}

export const Schedule: React.FC<ScheduleProps> = ({ schedule, isOwner, hasMicrosoft }) => {
    const showMicrosoftModal = typeof hasMicrosoft === 'undefined' ? false : !hasMicrosoft;

    const data = React.useMemo(() => {
        const scheduleObject = {
            data: JSON.parse(schedule.data as string),
            preferences: JSON.parse(schedule.preferences as string),
        } as unknown as ScheduleParsed;

        return scheduleObject;
    }, [schedule]);

    return (
        <Layout side={<Menu schedule={schedule} isOwner={isOwner} />}>
            <Calendar schedule={data} />
            {showMicrosoftModal && <MicrosoftModal />}
        </Layout>
    );
};
