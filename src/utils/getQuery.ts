export const getQuery = (param: string | string[] | undefined) => {
    return Array.isArray(param) ? param[0] : param;
};
