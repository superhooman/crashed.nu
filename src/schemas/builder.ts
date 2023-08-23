import { z } from 'zod';

export const selectedCourseSchema = z.object({
    id: z.string(),
    term: z.string(),
    selection: z.record(z.string()),
    abbr: z.string(),
});

export type SelectedCourse = z.infer<typeof selectedCourseSchema>;
