import type { Comment as CommentType, User as UserType } from "@prisma/client"
import { format, formatDistance } from "date-fns";
import React from "react";
import { Button } from "../Button";
import { ContentRenderer } from "../ContentRenderer";
import { Stack } from "../Stack";
import { Tooltip } from "../Tooltip";
import { Text } from "../Typography";
import { User } from "../User";

import cls from './Comment.module.scss';

export type CommentProp = CommentType & { user: Omit<UserType, 'xp' | 'emailVerified'> };

interface CommentProps {
    comment: CommentProp;
    children?: React.ReactNode;
    onReplyClick?: (comment: CommentProp) => void;
}

export const Comment: React.FC<CommentProps> = ({ comment, onReplyClick, children }) => {
    const { date } = comment;
    const [relativeDate, setRelativeDate] = React.useState(() => formatDistance(date, new Date()));

    const fullDate = React.useMemo(() => format(date, 'dd.MM.yyyy HH:mm:ss'), [date]);

    React.useEffect(() => {
        const interval = setInterval(() => setRelativeDate(formatDistance(date, new Date())), 5000);

        return () => clearInterval(interval);
    }, [date]);

    const handleReplyClick = React.useCallback(() => {
        onReplyClick?.(comment);
    }, [comment, onReplyClick]);

    return (
        <Stack direction="column" gap={6} className={cls.root}>
            <Stack alignItems="center" justifyContent="space-between" gap={8}>
                <User user={comment.user} size={24} small />
                {children}
            </Stack>
            <ContentRenderer content={comment.content} className={cls.content} />
            <Stack alignItems="center" justifyContent="space-between">
                <Button style={{
                    height: '20px',
                    lineHeight: '20px'
                }} onClick={handleReplyClick} disablePaddings variant="link" size="small">Reply</Button>
                <Tooltip
                    content={
                        <Text color="secondary" size="small">{fullDate}</Text>
                    }
                    side="bottom"
                    align="end"
                >
                    <Text color="secondary" size="small">{relativeDate} ago</Text>
                </Tooltip>
            </Stack>
        </Stack>
    )
};
