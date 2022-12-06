import { GearIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';

import cls from './Header.module.scss';
import { Container } from '../Container';
import { Select } from '../Select';
import { themeContext } from '@src/utils/theme';
import { Stack } from '../Stack';
import { Text } from '../Typography';

export const Glyph: React.FC<React.ComponentProps<'svg'>> = ({ ...props }) => (
    <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        shapeRendering="geometricPrecision"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cls.glyph}
        {...props}
    >
        <path d="M11.8 22h.4l1.23-7.45 6.87 2.65.2-.35L14.87 12l5.63-4.8-.2-.35-6.87 2.6L12.2 2h-.4l-1.23 7.45-6.87-2.6-.2.35L9.13 12 3.5 16.85l.2.35 6.87-2.65L11.8 22Z" fill="currentColor" />
    </svg>
);

type Props = React.ComponentProps<'nav'> & {
    sub?: string;
    fixed?: boolean;
    noContainer?: boolean;
};

export const Header: React.FC<Props> = ({ className, sub, children, fixed, noContainer, ...props }) => {
    const Wrap = React.useMemo(() => {
        return noContainer ? 
            ({ children }: { children: React.ReactNode }) => <div className={cls.container}>{children}</div>
            : ({ children }: { children: React.ReactNode }) => <Container className={cls.container}>{children}</Container>
    }, [noContainer]);

    const { theme, setTheme } = React.useContext(themeContext)

    return (
        (
            <>
                <nav className={clsx(className, cls.root, fixed && cls.fixed)} {...props}>
                    <Wrap>
                        <span className={cls.brand}>
                            <Link className={cls.logo} href="/">
                                <Glyph /> <span>crashed.<i>nu</i></span>
                            </Link>
                            {sub ? (
                                <>
                                    <svg
                                        fill="none"
                                        height="24"
                                        shapeRendering="geometricPrecision"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1"
                                        viewBox="0 0 24 24"
                                        width="24"
                                    >
                                        <path d="M16.88 3.549L7.12 20.451" />
                                    </svg>
                                    <span className={cls.sub}>{sub}</span>
                                </>
                            ) : null}
                        </span>
                        {children}
                        <Select
                            value={theme}
                            onValueChange={setTheme}
                            items={[
                                { label: (
                                    <Stack alignItems="center" gap={8}>
                                        <SunIcon className={cls.icon} />
                                        <Text size="small">Light</Text>
                                    </Stack>
                                ), value: 'light' },
                                { label: (
                                    <Stack alignItems="center" gap={8}>
                                        <MoonIcon className={cls.icon} />
                                        <Text size="small">Dark</Text>
                                    </Stack>
                                ), value: 'dark' },
                                { label: (
                                    <Stack alignItems="center" gap={8}>
                                        <GearIcon className={cls.icon} />
                                        <Text size="small">Auto</Text>
                                    </Stack>
                                ), value: 'system' },
                            ]}
                        />
                    </Wrap>
                </nav>
                {fixed && <div className={cls.placeholder} />}
            </>
        )
    )
};
