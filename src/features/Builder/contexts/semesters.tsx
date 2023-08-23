import React from 'react';

interface SemestersContext {
    semesters: { label: string, value: string }[];
}

export const semestersContext = React.createContext<SemestersContext>({} as SemestersContext);

export const useSemesters = () => React.useContext(semestersContext);

export const SemestersProvider: React.FC<React.PropsWithChildren<SemestersContext>> = ({ children, semesters }) => {
    return (
        <semestersContext.Provider value={{
            semesters,
        }}>
            {children}
        </semestersContext.Provider>
    );
};
