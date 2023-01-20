import type { Attachment, User} from '@prisma/client';
import { UserType } from '@prisma/client';
import { DotsVerticalIcon, Link1Icon, TrashIcon } from '@radix-ui/react-icons';
import { Button } from '@src/components/Button';
import { Menu, MenuItemWithIcon } from '@src/components/Menu';
import { type Post as PostType } from '@prisma/client';
import { Post as PostComponent } from '@src/components/Post';
import { ROUTES } from '@src/constants/routes';
import { getAttachmentUrl } from '@src/constants/storage';
import { trpc } from '@src/utils/trpc';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { stringifyUrl } from 'query-string';
import React from 'react';
import { Comments } from '../Comments';
import { getUserHandle } from '@src/server/social/utils/getUserHandle';

type PostProps = {
    post: PostType & {
        user: Omit<User, 'xp' | 'emailVerified'>, liked: boolean, likes: number, comments: number;
        attachments?: Attachment[];
    };
};

export const Post: React.FC<PostProps> = (props) => {
    const router = useRouter();
    const { posts } = trpc.useContext();
    const { data: session } = useSession();
    const [comments, setComments] = React.useState(false);

    const { data } = trpc.posts.post.useQuery({ id: props.post.id }, {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        initialData: props.post,
    });

    const { mutate: remove } = trpc.posts.removePost.useMutation({
        onSettled: () => posts.getPostsBySub.invalidate(),
    })

    const { mutate: like } = trpc.posts.likePost.useMutation({
        onSettled: () => posts.post.invalidate({ id: props.post.id }),
    });

    const onLikeClick = React.useCallback(() => {
        like({ id: props.post.id });
    }, [like, props.post.id]);

    const onDeleteClick = React.useCallback(() => {
        remove({ id: props.post.id })
    }, [props.post.id, remove]);

    const onCopyLinkClick = React.useCallback(() => {
        navigator.clipboard.writeText(ROUTES.POST.getWithParams({ id: props.post.id }, { full: true }));
    }, [props.post.id]);

    const onCommentClick = React.useCallback(() => {
        setComments((prev) => !prev);
    }, []);

    const menu = React.useMemo(() => {
        const isOwner = session?.user?.id === props.post.userId;
        const isAdmin = session?.user?.userType === UserType.ADMIN;

        return (
            <Menu
                modal={false}
                align="end"
                content={
                    <>
                        <MenuItemWithIcon
                            icon={<Link1Icon />}
                            onClick={onCopyLinkClick}
                        >
                            Copy link
                        </MenuItemWithIcon>
                        {(isOwner || isAdmin) ? (
                            <MenuItemWithIcon
                                icon={<TrashIcon />}
                                onClick={onDeleteClick}
                            >
                                Remove
                            </MenuItemWithIcon>
                        ) : null}
                    </>
                }
            >
                <Button size="small" icon={<DotsVerticalIcon />} variant="link" />
            </Menu>
        )
    }, [session, props.post.userId, onCopyLinkClick, onDeleteClick]);

    const onAttachmentClick = React.useCallback((id: string) => {
        router.push(stringifyUrl({
            url: router.pathname,
            query: {
                ...router.query,
                aid: id,
            },
        }), undefined, { shallow: true });
    }, [router]);

    const getUserLink = React.useCallback((user: { email: string | null }) => {
        const handle = getUserHandle(user.email) as string;
        return ROUTES.PROFILE.getWithParams({ id: handle });
    }, []);

    if (!data) {
        return null;
    }

    return (
        <div>
            <PostComponent
                post={{
                    ...data,
                    attachments: data.attachments.map((attachment) => ({
                        ...attachment,
                        url: getAttachmentUrl(attachment.id),
                    })),
                }}
                onLikeClick={onLikeClick}
                onCommentClick={onCommentClick}
                onAttachmentClick={onAttachmentClick}
                userLink={getUserLink}
            >
                {menu}
            </PostComponent>
            {comments && (
                <Comments postId={props.post.id} />
            )}
        </div>
    )
}
