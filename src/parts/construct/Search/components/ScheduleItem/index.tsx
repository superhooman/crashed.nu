import React from 'react';

import type { Schedule } from '@src/server/PCC/typings';

import { Card } from '@src/components/Card';
import { CircularProgress } from '@src/components/CircularProgress';
import { Property } from '@src/components/Property';
import { Stack } from '@src/components/Stack';
import { Tooltip } from '@src/components/Tooltip';
import { Text, TextSkeleton } from '@src/components/Typography';
import { typeDict, typeReg } from '@src/utils/data/getScheduleTypes';


import cls from './ScheduleItem.module.scss';

const WEEK_DAYS = ['M', 'T', 'W', 'R', 'F', 'S'];

export const ScheduleItemSkeleton: React.FC = () => {
    return (
        <Card>
            <Stack direction="column" gap={8} className={cls.root}>
                <TextSkeleton type="primary" size="small" bold />
                <Stack gap={8}>
                    {WEEK_DAYS.map((day) => (
                        <div key={day} data-skeleton className={cls.day}>
                            {day}
                        </div>
                    ))}
                </Stack>
                <Stack direction="column" gap={4}>
                    <Property label="Instructor" value="Loading..." />
                    <Property label="Room" value="Loading..." />
                    <Property label="Time" value="Loading..." />
                </Stack>
            </Stack>
        </Card>
    );
};

export const ScheduleItem: React.FC<{ schedule: Schedule }> = ({ schedule }) => {
    const type = schedule.st.match(typeReg)?.[0] || '';
    return (
        <Card>
            <Stack direction="column" gap={8} className={cls.root}>
                <Text type="primary" size="small" bold>{schedule.st} • {typeDict[type] || type}</Text>
                <Stack gap={8}>
                    {WEEK_DAYS.map((day) => (
                        <div key={day} data-selected={schedule.days.includes(day)} className={cls.day}>
                            {day}
                        </div>
                    ))}
                </Stack>
                <Stack direction="column" gap={4}>
                    <Property label="Instructor" value={schedule.faculty} />
                    <Property label="Room" value={schedule.room} />
                    <Property label="Time" value={schedule.times} />
                </Stack>
                <Tooltip delayDuration={0} content={`${schedule.enr}/${schedule.capacity}`}>
                    <div className={cls.capacity}>
                        <CircularProgress size={32} thickness={3} value={(Number(schedule.capacity) - schedule.enr) / Number(schedule.capacity) * 100} />
                        <span className={cls.number}>{`${Number(schedule.capacity) - schedule.enr}`}</span>
                    </div>
                </Tooltip>
            </Stack>
        </Card>
    );
};
