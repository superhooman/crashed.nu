import type { Time } from "@src/types/time";

const WEEKDAYS = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
    "SUNDAY"
] as const;

const COLORS = [
    "#DA3A2D",
    "#EC804F",
    "#ECC059",
    "#7BCA8F",
    "#65A6DA",
    "#9060EE",
    "#3F51B5",
    "#8E24AA",
    "#616161"
];

const COURSE_ABBR_TITLE_REGEXP = /([A-Z]{3,4} \d{3}) (.*?)</;

type RegistrarDay = {
    TIME: string;
} & Record<typeof WEEKDAYS[number], string>;

export interface Preferences {
    classes: string[];
    colors: Record<string, string>;
}

export interface UserScheduleItem {
    label: string;
    title: string;
    info: string;
    teacher: string;
    cab: string;
    id: string;
    time: {
        start: Time;
        end: Time;
    };
}

const getColorArray = (length: number) => {
    const res = [];
    for (let i = 0; i < length; i += 1) {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        res.push(COLORS[i % COLORS.length]!);
    }
    return res;
};

const parseTime = (str: string) => {
    return {
        hh: parseInt(str.split(":")[0]!, 10),
        mm: parseInt(str.split(":")[1]!, 10)
    };
};

const timeToHM = (str: string) => {
    const r = /\(([^)]+)\)/;
    const match = str.match(r)![1];
    if (!match) throw new Error("Invalid time format");
    const res = {
        start: parseTime(match.split("-")[0]!),
        end: parseTime(match.split("-")[1]!)
    };
    return res;
};

const parseDay = (input: string) => {
    const b = input.split("<br>");
    const time = timeToHM(b[1]!);

    const match = input.match(COURSE_ABBR_TITLE_REGEXP);

    if (!match) throw new Error("Invalid course format");

    const abbr = match[1]!;
    const label = match[2]!;

    return {
        label,
        title: b[1]!.split(' /')[0]!,
        info: b[2]!,
        teacher: b[3]!,
        cab: b[4]!,
        id: abbr.replace(' ', ''),
        time
    };
};

export const parseSchedule = (json: string) => {
    const preferences: Preferences = {
        classes: [],
        colors: {}
    };

    const data = JSON.parse(json) as RegistrarDay[];
    
    const week: [
        UserScheduleItem[],
        UserScheduleItem[],
        UserScheduleItem[],
        UserScheduleItem[],
        UserScheduleItem[],
        UserScheduleItem[],
        UserScheduleItem[],
    ] = [[], [], [], [], [], [], []];

    data.forEach(d => {
        WEEKDAYS.forEach((w, i) => {
            if (d[w]) {
                const item = parseDay(d[w]);
                if (!preferences.classes.includes(item.id)) {
                    preferences.classes.push(item.id);
                }
                if (week[i]?.map((x) => x.id).includes(item.id)) return;
                week[i]?.push(item);
            }
        });
    });

    week.forEach(day => {
        day.forEach((slot, i) => {
            if (
                slot.label !== "EMPTY" &&
                day[i + 1] &&
                day[i + 1]?.label !== "EMPTY"
            ) {
                if (slot.id === day[i + 1]?.id) {
                    day.slice(i + 1, 1);
                }
            }
        });
    });

    const cols = getColorArray(preferences.classes.length);

    preferences.classes.forEach((c, i) => {
        preferences.colors[c] = cols[i]!;
    });

    return {
        data: week,
        preferences,
    };
};

export type UserSchedule = ReturnType<typeof parseSchedule>;
