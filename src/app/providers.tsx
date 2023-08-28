'use client';

import { Theme } from '@radix-ui/themes';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { SWRConfig } from 'swr';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { green } from '@radix-ui/colors';

import type { PropsWithChildren } from 'react';


export const Providers: React.FC<PropsWithChildren> = ({ children }) => {
    return (
        <SWRConfig value={{
            provider: () => new Map(),
            revalidateOnFocus: false,
        }}>
            <SessionProvider>
                <ThemeProvider attribute="class">
                    <Theme accentColor="green" grayColor="mauve" panelBackground="solid" radius="large">
                        <ProgressBar color={green.green9} />
                        {children}
                    </Theme>
                </ThemeProvider>
            </SessionProvider>
        </SWRConfig>
    );
};
