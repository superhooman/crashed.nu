import React from 'react';

import { Text } from '@src/components/Typography';
import { getTimeRange } from '@src/utils/data/time';

import cls from './SubjectCard.module.scss';
import type { Time } from '@src/types/time';

interface SubjectCardProps {
    time: {
        startTime: Time;
        endTime: Time;
    },
    abbr: string;
    title: string;
    label: string;
    room: string;
    color?: string
}

export const SubjectCard: React.FC<SubjectCardProps> = ({
    time,
    abbr,
    title,
    label,
    room,
    color = 'var(--c-primary-500)',
}) => (
    <div className={cls.root}>
        <div className={cls.color} style={{
            backgroundColor: color,
        }} />
        <div className={cls.colorLine} style={{
            backgroundColor: color,
        }} />
        <Text className={cls.text} bold size="small">{abbr} • {title}</Text>
        <div className={cls.details}>
            <Text overflow className={cls.text} size="small">{label}</Text>
            <Text className={cls.text} size="small">Time: {getTimeRange(time)}</Text>
            <Text className={cls.text} size="small">Room: {room}</Text>
        </div>
    </div>
);
