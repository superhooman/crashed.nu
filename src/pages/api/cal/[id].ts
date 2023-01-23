/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { endOfWeek, startOfWeek, add, format } from 'date-fns';
import ical, { ICalEventRepeatingFreq } from 'ical-generator';

import type { NextApiHandler } from 'next';
import type { UserSchedule } from '@src/server/registrar/utils/parse';

import { env } from '@src/env/server.mjs';
import { prisma } from '@src/server/db/client';
import { pad2 } from '@src/utils/data/time';
import { getCurrentSemester, getSemesterDates } from '@src/utils/getCurrentSemester';

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

const handler: NextApiHandler = async (req, res) => {
    const id = req.query.id as string;

    if (!id) {
        res.status(404).json({ error: 'Not found' });
        return;
    }

    const schedule = await prisma.userSchedule.findUnique({ where: { id } });

    if (!schedule) {
        res.status(404).json({ error: 'Not found' });
        return;
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

    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-disposition', 'attachment; filename=export.ics');
    res.send(payload);
};

export default handler;
