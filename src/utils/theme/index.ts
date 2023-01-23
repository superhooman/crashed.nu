import React from 'react';

import type { IncomingMessage } from 'http';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'theme';

export type Theme = 'dark' | 'light' | 'system';

export const getTheme = () => {
    const theme = (document.cookie
        .split('; ')
        .find((row) => row.startsWith(COOKIE_NAME))
        ?.split('=')[1]) || 'system';

    return theme as Theme;
};

type Request = IncomingMessage & {
    cookies?: {
        [key: string]: string;
    } | Partial<{
        [key: string]: string;
    }>;
};

export const getThemeServer = (req?: Request | NextRequest) => {
    if (!req) {
        return 'system';
    }

    if ('rawHeaders' in req) {
        return req?.cookies?.[COOKIE_NAME] || 'system';
    }

    return (req.cookies.get(COOKIE_NAME) || 'system') as Theme;
};

export const saveTheme = (theme: Theme) => {
    const notCurrentTheme = ['dark', 'light', 'system'].filter((t) => t !== theme);

    notCurrentTheme.forEach((t) => {
        document.documentElement.classList.remove(t);
    });

    document.documentElement.classList.add(theme);
    document.cookie = `${COOKIE_NAME}=${theme}; expires=Thu, 09 Sep 2100 12:00:00 UTC`;
};

export const purgeTheme = () => {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
};

interface ThemeContext {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const themeContext = React.createContext<ThemeContext>({
    theme: 'system',
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setTheme: () => {},
});
