import type { WeekDay } from '@src/types/time';

export const indexToDay = (i: number): WeekDay => {
    switch (i) {
        case 0:
            return 'M';
        case 1:
            return 'T';
        case 2:
            return 'W';
        case 3:
            return 'R';
        case 4:
            return 'F';
        case 5:
            return 'S';
        default:
            return 'M';
    }
};

// Helps to render everything right
// Making the server render as it is in GMT+6
export const getTimeWithTimezoneOffset = () => {
    const current = new Date();
    const timezone = (current.getTimezoneOffset() / 60) + 6;

    return {
        hh: current.getHours() + timezone,
        mm: current.getMinutes(),
    };
};
