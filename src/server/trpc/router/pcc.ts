import { queryFormSchema } from "@src/schemas/query";
import PCC from "@src/server/PCC";
import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const pccRouter = router({
  semesters: publicProcedure
    .query(async () => {
      const semesters = await PCC.getSemesters();
      return semesters;
    }),
  schedule: publicProcedure
    .input(z.object({
      term: z.string(),
      id: z.string(),
    }))
    .query(async ({ input: { term, id } }) => {
      const schedule = await PCC.getSchedules(id, term);
      return schedule;
    }),
  schedulesForIds: publicProcedure
    .input(z.object({
      ids: z.string().array(),
      term: z.string(),
    }))
    .query(async ({ input: { ids, term } }) => {
      const data = await PCC.getSchedulesForIds(ids, term);
      return data;
    }),
  search: publicProcedure
    .input(queryFormSchema)
    .query(async ({ input: { query, term, level, cursor } }) => {
      const courses = await PCC.search(query, term, level, cursor);
      return courses;
    })
});
