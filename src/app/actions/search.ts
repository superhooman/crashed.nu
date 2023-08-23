'use server';
import type { SearchSchema} from '@src/schemas/search';

import { searchSchema } from '@src/schemas/search';
import PCC from '@src/server/PCC';
import { createAction } from '@src/utils/action';

export const search = createAction({
    schema: searchSchema,
    ctx: () => {},
    action: async (input: SearchSchema) => {
        const { query, term, level, page } = input;
        const data = await PCC.search(query, term, level, page);
        return data;
    }
});
