import { DotsVerticalIcon, PaperPlaneIcon, TrashIcon } from '@radix-ui/react-icons';
import { useSession } from 'next-auth/react';
import React from 'react';

import { Avatar } from '@src/components/Avatar';
import { Button } from '@src/components/Button';
import { type CommentProp, Comment } from '@src/components/Comment';
import { TextArea } from '@src/components/Input';
import { Loader } from '@src/components/Loader';
import { Menu, MenuItemWithIcon } from '@src/components/Menu';
import { Stack } from '@src/components/Stack';
import { Text } from '@src/components/Typography';
import { getUserHandle } from '@src/server/social/utils/getUserHandle';
import { trpc } from '@src/utils/trpc';

import cls from './Comments.module.scss';

interface CommentsProps {
    postId: string;
}

interface CommentContext {
    onReply?: (text: string) => void;
}

const commentContext = React.createContext<CommentContext>({});

const { Provider } = commentContext;

const CommentWrap: React.FC<{ comment: CommentProp }> = ({ comment }) => {
    const { posts } = trpc.useContext();
    const { data: session } = useSession();
    const { onReply } = React.useContext(commentContext);

    const { mutate: remove } = trpc.posts.removeComment.useMutation({
        onSettled: () => {
            posts.comments.invalidate({ id: comment.postId });
            posts.post.invalidate({ id: comment.postId });
        },
    });

    const handleRemoveClick = React.useCallback(() => {
        remove({ id: comment.id });
    }, [comment.id, remove]);

    const handleReplyClick = React.useCallback(({ user }: CommentProp) => {
        onReply?.('@' + getUserHandle(user.email) + ' ' ?? '');
    }, [onReply]);


    const menu = React.useMemo(() => {
        if (session?.user?.id !== comment.userId) return null;

        return (
            <Menu
                modal={false}
                align="end"
                content={
                    <MenuItemWithIcon
                        icon={<TrashIcon />}
                        onClick={handleRemoveClick}
                    >
                        Remove
                    </MenuItemWithIcon>
                }
            >
                <Button size="small" icon={<DotsVerticalIcon />} variant="link" />
            </Menu>
        );
    }, [comment, handleRemoveClick, session]);

    return (
        <Comment comment={comment} onReplyClick={handleReplyClick}>
            {menu}
        </Comment>
    );
};

const MAX_LENGTH = 256;

export const Comments: React.FC<CommentsProps> = ({ postId }) => {
    const { data: session } = useSession();
    const { posts } = trpc.useContext();
    const { data, isLoading, hasNextPage, fetchNextPage } = trpc.posts.comments.useInfiniteQuery({ id: postId }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    const [comment, setComment] = React.useState<string>('');
    const textArea = React.useRef<HTMLTextAreaElement>(null);

    const { mutate: add, isLoading: isAdding } = trpc.posts.addComment.useMutation({
        onSettled: () => {
            posts.comments.invalidate({ id: postId });
            posts.post.invalidate({ id: postId });
        },
    });

    const isOverLimit = comment.length > MAX_LENGTH;
    const isDisabled = isOverLimit || isAdding || !comment;

    const handleAdd = React.useCallback(() => {
        if (isDisabled) return;
        add({ postId, content: comment });
        setComment('');
    }, [add, postId, comment, isDisabled]);

    const handleSubmit = React.useCallback<React.FormEventHandler<HTMLFormElement>>((e) => {
        e.preventDefault();
        handleAdd();
    }, [handleAdd]);

    const handleKeyDown = React.useCallback<React.KeyboardEventHandler<HTMLFormElement>>((e) => {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            handleAdd();
        }
    }, [handleAdd]);

    const comments = React.useMemo(() => {
        if (!data) return null;

        return data.pages.flatMap(({ items }) => items).map((comment) => (
            <CommentWrap key={comment.id} comment={comment} />
        ));
    }, [data]);

    const onReply = React.useCallback((text: string) => {
        setComment(prev => {
            if (prev.includes(text)) {
                return prev;
            }
            return (prev ? `${prev} ` : '') + text;
        });
        textArea.current?.focus();
    }, []);

    return (
        <Provider value={{
            onReply,
        }}>
            <Stack className={cls.root} gap={8} direction="column">
                {isLoading ? (
                    <Stack gap={8} alignItems="center" justifyContent="center">
                        <Loader />
                        <Text size="small">Loading...</Text>
                    </Stack>
                ) : null}
                <div className={cls.padded}>
                    {comments}
                    {hasNextPage ? (
                        <div style={{ paddingTop: 8 }}>
                            <Button size="small" fullWidth onClick={() => fetchNextPage()}>Load more</Button>
                        </div>
                    ) : null}
                </div>
                <form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
                    <Stack alignItems="flex-start" gap={8} fullWidth>
                        {session?.user ? <Avatar className={cls.avatar} size={36} img={session?.user?.image} id={session?.user?.id} /> : null}
                        <TextArea
                            ref={textArea}
                            value={comment}
                            placeholder="Add a comment..."
                            onChange={(e) => setComment(e.target.value)}
                            fullWidth
                            maxLength={256}
                        />
                        <Button
                            icon={<PaperPlaneIcon />}
                            type="submit"
                            isLoading={isAdding}
                            disabled={isDisabled}
                        />
                    </Stack>
                </form>
            </Stack>
        </Provider>
    );
};
