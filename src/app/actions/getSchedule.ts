'use server';
import { z } from 'zod';

import PCC from '@src/server/PCC';
import { createAction } from '@src/utils/action';

export const getSchedules = createAction({
    schema: z.object({
        courseId: z.string(),
        term: z.string(),
    }),
    ctx: () => {},
    action: async ({ courseId, term }) => {
        const data = await PCC.getSchedules(courseId, term);
        return data;
    }
});
