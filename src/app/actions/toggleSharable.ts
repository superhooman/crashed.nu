'use server';
import { getServerSession } from 'next-auth';
import { z } from 'zod';

import { authOptions } from '@src/server/auth';
import { prisma } from '@src/server/db';
import { createAction } from '@src/utils/action';

export const toggleSharable = createAction({
  schema: z.object({
    shared: z.boolean(),
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
  action: async (input, { session }) => {
    const schedule = await prisma.userSchedule.findFirst({ where: {
        userId: session.user.id,
    } });

    if (!schedule) {
        throw new Error('No schedule found');
    };

    const { shared } =  await prisma.userSchedule.update({
        where: {
            id: schedule.id,
        },
        data: {
            shared: input.shared,
        },
    });

    return shared;
  },
});
