import React from 'react';

import type { UserSchedule } from '@src/server/registrar/utils/parse';

import { CalendarView } from '@src/components/CalendarView';

import { getWeek } from '../../utils/getWeek';

interface Props {
    schedule: UserSchedule;
}

export const Calendar: React.FC<Props> = ({ schedule }) => {
    const week = React.useMemo(() => getWeek(schedule), [schedule]);

    return (
        <>
            <CalendarView week={week} />
        </>
    );
};
