import React from 'react';
import { SWRConfig, useSWRConfig } from 'swr';

import type { Cache} from 'swr';

const isAvailable = typeof window !== 'undefined';

const localStorageKey = 'app-cache';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveState = (cache: Cache<any> | Map<unknown, unknown>) => {
    const appCache = JSON.stringify(Array.from((cache as Map<unknown, unknown>).entries()));
    localStorage.setItem(localStorageKey, appCache);
};

export const localStorageProvider = () => {
    if (!isAvailable) {
        return new Map();
    }

    let appCache = [];

    try {
        appCache = JSON.parse(localStorage.getItem(localStorageKey) || '[]');
    } catch (e) {
        console.error(e);
    }

    const map = new Map(appCache);

    window.addEventListener('beforeunload', () => {
        saveState(map);
    });

    return map;
};

interface CacheProvider {
    clearCache: () => void;
}

const cacheContext = React.createContext<CacheProvider>({} as CacheProvider);

export const useCache = () => React.useContext(cacheContext);

const InnerCacheProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const { cache } = useSWRConfig();

    const clearCache = React.useCallback(() => {
        (cache as Map<unknown, unknown>).clear();
        localStorage.removeItem(localStorageKey);
    }, [cache]);

    return (
        <cacheContext.Provider value={{
            clearCache,
        }}>
            {children}
        </cacheContext.Provider>
    );
};

export const CacheProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <SWRConfig value={{
            provider: localStorageProvider,
        }}>
            <InnerCacheProvider>
                {children}
            </InnerCacheProvider>
        </SWRConfig>
    );
};
