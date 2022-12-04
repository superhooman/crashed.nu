import type { ReactNode } from 'react';

export type WeekDay = 'M' | 'T' | 'W' | 'R' | 'F' | 'S';

export interface Time {
    hh: number;
    mm: number;
}

export interface Item {
    startTime: Time;
    endTime: Time;
    content?: ReactNode;
}
