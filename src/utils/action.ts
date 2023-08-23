import type z from 'zod';

interface CreateActionProps<Schema extends z.ZodTypeAny, Data, Context> {
    schema: Schema;
    ctx: () => Promise<Context> | Context;
    action: (input: z.infer<Schema>, ctx: Context) => Promise<Data>;
}

export const createAction = <Schema extends z.ZodTypeAny, Data, Context>({
    schema,
    ctx,
    action,
}: CreateActionProps<Schema, Data, Context>) => async (input: z.infer<Schema>) => {
    const parsedInput = schema.parse(input);
    const context = typeof ctx === 'function' ? (await ctx()) : ctx;
    const data = await action(parsedInput, context);
    return data;
};
