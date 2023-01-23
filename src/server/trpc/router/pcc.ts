import { z } from 'zod';

import type { Schedule } from '@prisma/client';

import { queryFormSchema } from '@src/schemas/query';
import PCC from '@src/server/PCC';

import { router, publicProcedure } from '../trpc';

export const pccRouter = router({
  semesters: publicProcedure
    .input(z.object({ pdf: z.boolean().optional() }))
    .query(async ({ input: { pdf } }) => {
      if (pdf) {
        const semesters = [{ label: 'Spring 2023', value: '1' }];
        return semesters;
      }

      const semesters = await PCC.getSemesters();
      return semesters;
    }),
  schedule: publicProcedure
    .input(z.object({
      term: z.string(),
      id: z.string(),
      pdf: z.boolean().optional(),
    }))
    .query(async ({ input: { term, id, pdf }, ctx: { prisma } }) => {
      if (pdf) {
        const schedule = await prisma.schedule.findMany({
          where: {
            courseId: id,
          },
        });
        return schedule;
      }
      const schedule = await PCC.getSchedules(id, term);
      return schedule;
    }),
  schedulesForIds: publicProcedure
    .input(z.object({
      ids: z.string().array(),
      term: z.string(),
      pdf: z.boolean().optional(),
    }))
    .query(async ({ input: { ids, term, pdf }, ctx: { prisma } }) => {
      if (pdf) {
        const schedules = await Promise.all(ids.map(async (id) => {
          const schedule = await prisma.schedule.findMany({
            where: {
              courseId: id,
            },
          });
          return [id, schedule] as [string, Schedule[]];
        }));
        return schedules.reduce<Record<string, Schedule[]>>((dict, [id, schedules]) => {
          dict[id] = schedules;
          return dict;
        }, {});
      }

      const data = await PCC.getSchedulesForIds(ids, term);
      return data;
    }),
  search: publicProcedure
    .input(queryFormSchema)
    .query(async ({ input: { query, term, level, cursor, pdf }, ctx: { prisma } }) => {
      if (pdf) {
        const courses = await prisma.course.findMany({
          where: {
            OR: [
              { title: { contains: query, mode: 'insensitive' } },
              { abbr: { contains: query, mode: 'insensitive' } },
            ],
          },
        });
        return {
          items: courses,
          cursor: null,
        };
      }
      const courses = await PCC.search(query, term, level, cursor);
      return courses;
    })
});
