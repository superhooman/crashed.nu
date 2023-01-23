import { StarFilledIcon } from '@radix-ui/react-icons';
import clsx from 'clsx';
import React from 'react';

import type { User as UserType } from '@prisma/client';

import { Avatar } from '../Avatar';
import { Stack } from '../Stack';
import { Tooltip } from '../Tooltip';
import { Text } from '../Typography';
import cls from './User.module.scss';

interface UserProps {
    user: Omit<UserType, 'xp' | 'emailVerified'>
    size?: number;
    small?: boolean;
    onlyAvatar?: boolean;
}

export const User: React.FC<UserProps> = ({
    user: { name, image, email, id, userType },
    size = 36,
    small = false,
    onlyAvatar = false,
}) => {
    const handle = '@' + email?.split('@')[0];
    const isAdmin = userType === 'ADMIN';

    const info = !small ? (
        <Stack direction="column">
            <Text overflow bold>{name}</Text>
            <Text color="secondary" overflow size="small">{handle}</Text>
        </Stack>
    ) : (
        <Stack direction="column">
            <Text overflow bold size="small">{name}</Text>
        </Stack>
    );

    return (
        <Stack className={clsx(cls.root, small && cls.small)} alignItems="center" gap={small ? 8 : 12}>
            {isAdmin && (
                <Tooltip side="bottom" align="start" content="Admin">
                    <div className={cls.admin}>
                        <StarFilledIcon className={cls.icon} />
                    </div>
                </Tooltip>
            )}
            <Avatar
                img={image}
                size={size}
                id={id}
            />
            {onlyAvatar ? null : info}
        </Stack>
    );
};
