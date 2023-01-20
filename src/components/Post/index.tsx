import type { Post as PostType, User as UserType } from "@prisma/client"
import { ChatBubbleIcon, HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { format, formatDistance } from "date-fns";
import Link from "next/link";
import React from "react";
import { Button } from "../Button";
import { ContentRenderer } from "../ContentRenderer";
import { Stack } from "../Stack";
import { Tooltip } from "../Tooltip";
import { Text } from "../Typography";
import { User } from "../User";
import cls from './Post.module.scss';

export interface Props {
    post: PostType & {
        user: Omit<UserType, 'xp' | 'emailVerified'>, liked: boolean, likes: number, comments: number;
        attachments?: { url: string, id: string }[];
    };
    onAttachmentClick?: (id: string) => void;
    onLikeClick?: () => void;
    onCommentClick?: () => void;
    userLink?: (user: { email: string | null }) => string;
    children?: React.ReactNode;
}

export const Post: React.FC<Props> = ({ post, onLikeClick, onCommentClick, onAttachmentClick, userLink, children }) => {
    const { date } = post;
    const [relativeDate, setRelativeDate] = React.useState(() => formatDistance(date, new Date()));

    const fullDate = React.useMemo(() => format(date, 'dd.MM.yyyy HH:mm:ss'), [date]);

    React.useEffect(() => {
        const interval = setInterval(() => setRelativeDate(formatDistance(date, new Date())), 5000);

        return () => clearInterval(interval);
    }, [date]);

    const user = (<User user={post.user} />)

    return (
        <div className={cls.root}>
            <Stack alignItems="center" justifyContent="space-between" gap={8}>
                {userLink ? (<Link href={userLink(post.user)}>{user}</Link>) : user}
                {children}
            </Stack>
            <ContentRenderer content={post.content} className={cls.content} />
            {post.attachments && post.attachments.length > 0 ? (
                <div className={cls.photos}>
                    <div className={cls.placeholder} />
                    <div className={cls.items}>
                        {post.attachments.map((attachment, i) => (
                            <div className={cls.photo} key={attachment.id}>
                                <img
                                    onClick={() => onAttachmentClick?.(attachment.id)}
                                    src={attachment.url}
                                    alt={`Attachment ${i + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
            <Stack alignItems="center" justifyContent="space-between" gap={8}>
                <Stack alignItems="center" className={cls.buttons} gap={8}>
                    <Button
                        size="small"
                        variant="ghost"
                        onClick={onLikeClick}
                        className={clsx(cls.button, post.liked && cls.liked)}
                        icon={post.liked ? <HeartFilledIcon className={cls.icon} /> : <HeartIcon className={cls.icon} />}
                    >
                        {post.likes}
                    </Button>
                    <Button
                        size="small"
                        variant="ghost"
                        icon={<ChatBubbleIcon />}
                        onClick={onCommentClick}
                        className={cls.button}
                    >
                        {post.comments}
                    </Button>
                </Stack>
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
        </div>
    );
};
