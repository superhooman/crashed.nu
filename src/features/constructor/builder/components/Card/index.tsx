import React from 'react';

import { Text } from '@src/components/Typography';
import type { Course, Schedule } from '@src/server/PCC/typings';
import type { Item } from '@src/types/time';
import { getTimeRange } from '@src/utils/data/time';

import cls from './Card.module.scss';

interface CardProps {
    course: Course;
    schedule: Schedule;
    range: Omit<Item, 'content'>;
}

export const Card: React.FC<CardProps> = ({ course, schedule, range }) => (
    <div className={cls.root}>
        <Text className={cls.text} color="primary" size="small">{course.abbr} • {schedule.st}</Text>
        <Text className={cls.text} size="small">Instr.: {schedule.faculty}</Text>
        <Text className={cls.text} size="small">Time: {getTimeRange(range)}</Text>
        <Text className={cls.text} size="small">Room: {schedule.room}</Text>
    </div>
);
