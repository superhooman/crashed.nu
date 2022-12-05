import { z } from 'zod';

export const queryFormSchema = z.object({
    query: z.string(),
    level: z.string(),
    term: z.string(),
    cursor: z.number().optional(),
    pdf: z.boolean().optional(),
});

export type QueryFormSchema = z.infer<typeof queryFormSchema>;
