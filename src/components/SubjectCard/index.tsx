import React from 'react';
import { Text } from '@radix-ui/themes';
import clsx from 'clsx';

import type { Time } from '@src/types/time';

import { getTimeRange } from '@src/utils/data/time';


import * as cls from './styles.css';

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
  color = 'var(--accent-9)',
}) => (
  <div className={cls.root}>
    <div className={cls.color} style={{
      backgroundColor: color,
    }} />
    <div className={cls.colorLine} style={{
      backgroundColor: color,
    }} />
    <Text className={cls.text} weight="bold">{abbr} • {title}</Text>
    <div className={cls.details}>
      <Text className={clsx(cls.text, cls.overflow)}>{label}</Text>
      <Text className={cls.text}>Time: {getTimeRange(time)}</Text>
      <Text className={cls.text}>Room: {room}</Text>
    </div>
  </div>
);
