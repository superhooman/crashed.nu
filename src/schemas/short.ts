import { z } from 'zod';

export const ALHPANUM_UNDERSCORE_DOT = /^[a-z0-9._]+$/i;

export const shortSchema = z.object({
    slug: z.string()
        .regex(ALHPANUM_UNDERSCORE_DOT)
        .min(3)
        .max(32),
});
