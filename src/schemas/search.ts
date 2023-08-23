import { z } from 'zod';

export const searchSchema = z.object({
    query: z.string(),
    term: z.string(),
    level: z.string(),
    page: z.number().optional(),
});

export type SearchSchema = z.infer<typeof searchSchema>;
