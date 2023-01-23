import React from 'react';

import type { Schedule } from '@src/server/PCC/typings';

import { getTypes, typeDict, typeReg } from '@src/utils/data/getScheduleTypes';
import { Text } from '@src/components/Typography';
import { getRange } from '@src/utils/data/time';
import { Select } from '@src/components/Select';

import cls from './Schedules.module.scss';

interface SchedulesProps {
    schedule?: Schedule[];
    selection: Record<string, string>;
    getSelectionHandler: (type: string) => (value: string) => void;
}

export const Schedules: React.FC<SchedulesProps> = ({ schedule = [], getSelectionHandler, selection }) => {
    const types = React.useMemo<string[]>(() => Array.from(getTypes(schedule)), [schedule]);

    return (
        <div className={cls.root}>
            {types.length ? (
                <div className={cls.grid}>
                    {types.map((el) => (
                        <Type
                            onSelect={getSelectionHandler(el)}
                            type={el}
                            schedule={schedule}
                            key={el}
                            value={selection[el]}
                        />
                    ))}
                </div>
            ) : (
                <Text size="small" className={cls.noSchedule} color="secondary">There is no schedule for this course</Text>
            )}
        </div>
    );
};

interface TypeProps {
    schedule: Schedule[];
    type: string;
    value?: string,
    onSelect: (v: string) => void;
}

const ScheduleItem: React.FC<Schedule> = ({ st, times, days, faculty }) => (
    <div className={cls.scheduleItem}>
        <Text overflow size="small" block>{st} • {getRange(times)} {days}</Text>
        <Text overflow size="small" block>{faculty}</Text>
    </div>
);

const Type: React.FC<TypeProps> = ({ schedule, type, onSelect, value = '-1' }) => {
    const options = React.useMemo(() => schedule.filter(({ st }) => st.match(typeReg)?.[0] === type).map((schedule, i) => ({
        label: <ScheduleItem {...schedule} />,
        value: `${i}`,
    })), [schedule, type]);

    const changeHanlder = React.useCallback((value: string) => {
        onSelect(value);
    }, [onSelect]);

    return (
        <Select
            onValueChange={changeHanlder}
            value={value}
            items={[
                {
                    label: (
                        <div className={cls.scheduleItem}>
                            <Text size="small" block>{typeDict[type] || type}</Text>
                            <Text size="small" block>Not selected</Text>
                        </div>
                    ),
                    value: '-1'
                },
                ...options,
            ]} />
    );
};
