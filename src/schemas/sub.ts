import { z } from 'zod';

import { ALHPANUM_UNDERSCORE_DOT } from './short';

export const subSchema = z.object({
    slug: z.string().regex(ALHPANUM_UNDERSCORE_DOT),
    name: z.string(),
});

export const sort = z.union([z.literal('new'), z.literal('hot'), z.literal('top')]);

export type Sort = z.infer<typeof sort>;

export const getPostsBySubSchema = z.object({
    sub: z.string().regex(ALHPANUM_UNDERSCORE_DOT),
    date: z.date(),
    cursor: z.string().optional(),
    sort,
});
