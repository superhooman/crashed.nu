import React from 'react';

import { Text } from '@src/components/Typography';
import { getTimeRange } from '@src/utils/data/time';
import type { Preferences, UserScheduleItem } from '@src/server/registrar/utils/parse';

import cls from './Card.module.scss';

interface CardProps {
    item: UserScheduleItem;
    preferences: Preferences;
}

export const Card: React.FC<CardProps> = ({ item, preferences }) => (
    <div className={cls.root}>
        <div className={cls.color} style={{
            backgroundColor: preferences.colors[item.id],
        }} />
        <div className={cls.colorLine} style={{
            backgroundColor: preferences.colors[item.id],
        }} />
        <Text className={cls.text} bold size="small">{item.id} • {item.title}</Text>
        <div className={cls.details}>
            <Text overflow className={cls.text} size="small">{item.label}</Text>
            <Text className={cls.text} size="small">Time: {getTimeRange({ startTime: item.time.start, endTime: item.time.end })}</Text>
            <Text className={cls.text} size="small">Room: {item.cab}</Text>
        </div>
    </div>
);
