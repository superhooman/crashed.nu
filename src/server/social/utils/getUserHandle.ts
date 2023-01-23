import { ORG_DOMAIN } from '@src/constants/org';

export const getUserHandle = (email?: string | null) => {
    const handle = email?.split('@')[0];
    return handle;
};

export const getEmail = (handle?: string) => {
    const email = handle + '@' + ORG_DOMAIN;

    return email;
};
