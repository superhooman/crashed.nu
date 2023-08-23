import { endOfWeek, startOfWeek, add, format } from 'date-fns';
import ical, { ICalEventRepeatingFreq } from 'ical-generator';

import type { NextRequest} from 'next/server';
import type { UserSchedule } from '@src/server/registrar/utils/parse';

import { pad2 } from '@src/utils/data/time';
import { getCurrentSemester, getSemesterDates } from '@src/utils/semester/getCurrentSemester';
import { env } from '@src/env.mjs';
import { prisma } from '@src/server/db';

const getCurrentWeek = () => {
    const now = new Date();
    const start = startOfWeek(now, { weekStartsOn: 1 });
    const end = endOfWeek(now, { weekStartsOn: 1 });

    const days = [];
    let day = start;

    while (day <= end) {
        days.push(day);
        day = add(day, { days: 1 });
    }
    return days;
};

export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
        return new Response('Missing id', { status: 400 });
    }

    const schedule = await prisma.userSchedule.findUnique({ where: { id } });

    if (!schedule) {
        return new Response('Schedule not found', { status: 404 });
    }

    const currentWeek = getCurrentWeek();

    const semester = getCurrentSemester(new Date());

    const calendar = ical({
        timezone: 'Asia/Almaty',
        url: env.NEXTAUTH_URL,
        name: `${semester.semester} ${semester.year}`,
    });

    const week = JSON.parse(schedule.data as string) as UserSchedule['data'];

    const range = getSemesterDates(semester);

    for (const i in week) {
        for (const item of week[i]!) {
            const event = calendar.createEvent({
                start: format(currentWeek[i]!, 'yyyy-MM-dd') + 'T' + pad2(item.time.start.hh) + ':' + pad2(item.time.start.mm) + ':00',
                end: format(currentWeek[i]!, 'yyyy-MM-dd') + 'T' + pad2(item.time.end.hh) + ':' + pad2(item.time.end.mm) + ':00',
                summary: item.id + ' ' + item.label + ' ' + item.title,
                description: item.teacher,
                location: item.cab,
            });
            event.repeating({
                freq: ICalEventRepeatingFreq.WEEKLY,
                until: range.end,
            });
        }
    }

    const payload = calendar.toString();

    const res = new Response(payload, {
        status: 200,
        headers: {
            'Content-Type': 'text/calendar; charset=utf-8',
            'Content-disposition': 'attachment; filename=export.ics',
        },
    });

    return res;
};

