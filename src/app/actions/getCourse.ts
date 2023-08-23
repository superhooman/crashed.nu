'use server';
import { z } from 'zod';

import PCC from '@src/server/PCC';
import { createAction } from '@src/utils/action';

export const getCourse = createAction({
    schema: z.object({
        courseId: z.string(),
    }),
    ctx: () => {},
    action: async ({ courseId }) => {
        const data = await PCC.getCourse(courseId);
        return data;
    }
});
