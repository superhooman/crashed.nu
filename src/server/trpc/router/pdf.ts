import type { Schedule } from "@prisma/client";
import { queryFormSchema } from "@src/schemas/query";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const pdfRouter = router({
  semesters: publicProcedure
    .query(async () => {
      const semesters = [{ label: 'Spring 2023', value: '1' }];
      return semesters;
    }),
  schedule: publicProcedure
    .input(z.object({
      term: z.string(),
      id: z.string(),
    }))
    .query(async ({ input: { id }, ctx: { prisma } }) => {
      const schedule = await prisma.schedule.findMany({
        where: {
          courseId: id,
        },
      });
      return schedule;
    }),
  schedulesForIds: publicProcedure
    .input(z.object({
      ids: z.string().array(),
      term: z.string(),
    }))
    .query(async ({ input: { ids }, ctx: { prisma } }) => {
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
    }),
  search: publicProcedure
    .input(queryFormSchema)
    .query(async ({ input: { query }, ctx: { prisma } }) => {
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
    })
});
