import Registrar from "@src/server/registrar";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const registrarRouter = router({
    sync: protectedProcedure
        .input(z.object({
            password: z.string(),
        }))
        .mutation(async ({ input: { password }, ctx: { session, prisma } }) => {
            const username = session.user.email!.split('@')[0]!;

            if (!username) throw new Error('No username found');

            const { data, preferences } = await Registrar.sync(username, password);

            const schedule = await prisma.userSchedule.upsert({
                where: {
                    userId: session.user.id,
                },
                update: {
                    data: JSON.stringify(data),
                    preferences: JSON.stringify(preferences),
                },
                create: {
                    userId: session.user.id,
                    data: JSON.stringify(data),
                    preferences: JSON.stringify(preferences),
                },
            });

            return schedule.id;
        }),
    share: protectedProcedure
        .mutation(async ({ ctx: { session, prisma } }) => {
            await prisma.userSchedule.update({
                where: {
                    userId: session.user.id,
                },
                data: {
                    shared: true,
                },
            });

            return true;
        }),
});
