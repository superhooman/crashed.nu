import type { ParsedUrlQuery } from 'querystring';

export const getParam = (query: ParsedUrlQuery[string]) => {
    return Array.isArray(query) ? query[0] : query;
};
