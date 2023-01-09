import { RESTRICTED_OR_RESERVED_SLUGS } from "@src/constants/slugs";
import { ALHPANUM_UNDERSCORE_DOT, shortSchema } from "@src/schemas/short";
import Registrar from "@src/server/registrar";
import { TRPCError } from "@trpc/server";
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
    short: protectedProcedure
        .query(async ({ ctx: { session, prisma } }) => {
            const id = session.user.id;

            const schedule = await prisma.userSchedule.findUnique({ where: { userId: id, }, select: { short: true } });

            if (!schedule) {
                throw new TRPCError({ code: 'NOT_FOUND' });
            }

            return schedule.short;
        }),
    checkShort: protectedProcedure
        .input(z.object({
            slug: z.string(),
        }))
        .query(async ({ ctx: { prisma, session }, input: { slug } }) => {
            if (slug.length < 3 || slug.length > 32) {
                return false;
            }
            if (!ALHPANUM_UNDERSCORE_DOT.test(slug)) {
                return false;
            }
            if (RESTRICTED_OR_RESERVED_SLUGS.includes(slug)) {
                return false;
            }

            const used = await prisma.userSchedule.findUnique({
                where: {
                    short: slug,
                },
                select: {
                    short: true,
                    user: true,
                },
            });

            if (used?.user.id === session.user.id) {
                return true;
            }

            if (used) {
                return false;
            }

            return true;
        }),
    setShort: protectedProcedure
        .input(shortSchema)
        .mutation(async ({ ctx: { prisma, session }, input: { slug } }) => {
            const used = await prisma.userSchedule.findUnique({
                where: {
                    short: slug,
                },
                select: {
                    short: true,
                    user: true,
                },
            });

            if (used?.user.id === session.user.id) {
                return used.short;
            }

            if (used) {
                return false;
            }

            await prisma.userSchedule.update({
                where: {
                    userId: session.user.id,
                },
                data: {
                    short: slug,
                }
            });

            return slug;
        })
});
