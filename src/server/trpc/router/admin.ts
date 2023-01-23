import { subSchema } from '@src/schemas/sub';

import { adminProcedure, router } from '../trpc';

export const adminRouter = router({
    subs: adminProcedure
        .query(async ({ ctx: { prisma } }) => {
            return await prisma.sub.findMany({});
        }),
    addSub: adminProcedure
        .input(subSchema)
        .mutation(async ({ input, ctx: { prisma } }) => {
            return await prisma.sub.create({
                data: {
                    ...input,
                }
            });
        }),
});
