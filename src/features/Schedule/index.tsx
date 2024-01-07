'use client';
import React from 'react';

import type { User, UserSchedule } from '@prisma/client';
import type { UserSchedule as ScheduleParsed } from '@src/server/registrar/utils/parse';

import { Layout } from './layout';
import { Calendar } from './components/Calendar';
import { Menu } from './components/Menu';

interface ScheduleProps {
    isOwner: boolean;
    schedule: UserSchedule & { user: Pick<User, 'name' | 'image'> };
}

export const Schedule: React.FC<ScheduleProps> = ({ schedule, isOwner }) => {

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
        </Layout>
    );
};
