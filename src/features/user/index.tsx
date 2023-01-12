import { ExitIcon, GearIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Avatar } from "@src/components/Avatar";
import { Button } from "@src/components/Button";
import Menu, { MenuItem, MenuItemWithIcon, MenuSeparator } from "@src/components/Menu/Menu";
import { Select } from "@src/components/Select";
import { Stack } from "@src/components/Stack";
import { Text } from "@src/components/Typography";
import { ROUTES } from "@src/constants/routes";
import { themeContext } from "@src/utils/theme";
import { signOut, useSession } from "next-auth/react"
import Link from "next/link";
import React from "react";
import cls from './User.module.scss';

interface UserProps {
    showFallback?: boolean;
    showName?: boolean;
}

export const User: React.FC<UserProps> = ({ showFallback, showName = true }) => {
    const { data: session } = useSession();
    const { theme, setTheme } = React.useContext(themeContext);

    if (!session?.user) {
        if (!showFallback) {
            return null;
        }

        return (
            <Link href={ROUTES.AUTH.get()}>
                <Button>Sign in</Button>
            </Link>
        )
    }

    return (
        <Menu
            content={(
                <>
                    <Stack className={cls.menuCustomItem} direction="column" gap={4}>
                        <Text bold>{session.user.name}</Text>
                        <Text color="secondary" size="small">{session.user.email}</Text>
                    </Stack>
                    <MenuSeparator />
                    <Stack className={cls.menuCustomItem} alignItems="center" justifyContent="space-between" gap={8}>
                        <Text color="secondary" size="small">Theme</Text>
                        <Select
                            value={theme}
                            onValueChange={setTheme}
                            items={[
                                {
                                    label: (
                                        <Stack alignItems="center" gap={8}>
                                            <SunIcon className={cls.icon} />
                                            <Text size="small">Light</Text>
                                        </Stack>
                                    ), value: 'light'
                                },
                                {
                                    label: (
                                        <Stack alignItems="center" gap={8}>
                                            <MoonIcon className={cls.icon} />
                                            <Text size="small">Dark</Text>
                                        </Stack>
                                    ), value: 'dark'
                                },
                                {
                                    label: (
                                        <Stack alignItems="center" gap={8}>
                                            <GearIcon className={cls.icon} />
                                            <Text size="small">System</Text>
                                        </Stack>
                                    ), value: 'system'
                                },
                            ]}
                        />
                    </Stack>
                    <MenuSeparator />
                    <MenuItemWithIcon
                        icon={<ExitIcon />}
                        onClick={() => signOut({ callbackUrl: ROUTES.HOME.get() })}
                    >
                        Logout
                    </MenuItemWithIcon>
                </>
            )}
            align="end"
        >
            <Stack gap={8} alignItems="center">
                <Avatar
                    id={session.user.id}
                    size={32}
                    img={session.user.image}
                />
                {showName && <Text size="small" color="secondary">{session.user.name}</Text>}
            </Stack>
        </Menu>
    )
}