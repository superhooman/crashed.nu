'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@src/server/auth';
import { prisma } from '@src/server/db';
import registrar from '@src/server/registrar';
import { createAction } from '@src/utils/action';

export const syncRegistrar = createAction({
    schema: z.object({
        password: z.string(),
    }),
    ctx: async () => {
        const session = await getServerSession(authOptions);

        if (!session) {
            throw new Error('Not authenticated');
        }

        return {
            session,
        };
    },
    action: async ({ password }, { session }) => {
        const username = session.user.email!.split('@')[0]!;

        if (!username) throw new Error('No username found');

        const { data, preferences } = await registrar.sync(username, password);

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
    },
});
