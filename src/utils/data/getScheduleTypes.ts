import type { Schedule } from '@src/server/PCC/typings';

export const typeDict: Record<string, string> = {
    'L': 'Lecture',
    'R': 'Recitation',
    'S': 'Seminar',
    'PLb': 'PhysLab',
    'CLb': 'CompLab',
    'Lb': 'Lab',
    'Int': 'Internship'
};

export const typeReg = /[a-zA-Z]+/;

export const getType = (ST: string) => {
    const match = ST.match(typeReg);
    return match?.[0] ?? '';
};

export const getTypes = (schedules: Schedule[]) => new Set(schedules.map(({ st }) => getType(st)).filter((st) => st?.length));
