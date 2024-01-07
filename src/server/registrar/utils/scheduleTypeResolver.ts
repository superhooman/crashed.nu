import { z } from 'zod';

const dataScheme = z.object({
    personalSchedule: z.object({
        access: z.object({
            current: z.number(),
            reg: z.number(),
        }),
    }),
});

export const scheduleTypeResolver = (html: string) => {
    try {
        const data = html.split('jQuery.extend(Drupal.settings, ')[1]?.split('})')[0] + '}';

        const parsed = JSON.parse(data);

        const result = dataScheme.parse(parsed);

        if (result.personalSchedule.access.reg === 1) {
            return 'reg';
        }

        return 'current';
    } catch (e) {
        return 'current';
    }
};
