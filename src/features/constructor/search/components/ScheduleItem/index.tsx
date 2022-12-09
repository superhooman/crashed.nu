import { Card } from "@src/components/Card";
import { Property } from "@src/components/Property";
import { Stack } from "@src/components/Stack";
import { Text, TextSkeleton } from "@src/components/Typography";
import type { Schedule } from "@src/server/PCC/typings";
import { typeDict, typeReg } from "@src/utils/data/getScheduleTypes";
import React from "react";
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
                    <Property label="Capacity" value="Loading..." />
                    <Property label="Room" value="Loading..." />
                    <Property label="Time" value="Loading..." />
                </Stack>
            </Stack>
        </Card>
    )
}

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
                    <Property label="Capacity" value={`${schedule.enr}/${schedule.capacity}`} />
                    <Property label="Room" value={schedule.room} />
                    <Property label="Time" value={schedule.times} />
                </Stack>
            </Stack>
        </Card>
    );
};
