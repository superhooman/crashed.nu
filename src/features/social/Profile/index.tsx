import { type User as IUser, UserType } from "@prisma/client"
import { Container } from "@src/components/Container";
import { Divider } from "@src/components/Divider";
import { Empty } from "@src/components/Empty";
import { Header } from "@src/components/Header";
import { Stack } from "@src/components/Stack";
import { Paragraph, Title } from "@src/components/Typography";
import { User } from "@src/components/User";
import { trpc } from "@src/utils/trpc";
import React from "react";
import { Post } from "../Post";
import cls from './Profile.module.scss';

interface ProfileProps {
    user: IUser;
}

export const Profile: React.FC<ProfileProps> = ({ user }) => {
    const { data } = trpc.posts.getUserPosts.useInfiniteQuery({ id: user.id }, {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
    });

    const posts = React.useMemo(() => {
        return data?.pages.flatMap((page) => page.items) ?? [];
    }, [data]);

    return (
        <>
            <Header fixed />
            <Container className={cls.root}>
                <Stack
                    direction="column"
                    gap={8}
                >
                    <User
                        user={user}
                        onlyAvatar
                        size={64}
                    />
                    <Title level={2} className={cls.name}>{user.name}</Title>
                    <Paragraph color="secondary">{user.email}</Paragraph>
                </Stack>
                <Divider />
                {user.userType !== UserType.PREUSER ? (
                    <Stack
                        direction="column"
                        gap={8}
                    >
                        <Title level={4}>Posts</Title>
                        {posts.map((post) => (
                            <Post post={post} key={post.id} sub />
                        ))}
                        {posts.length === 0 ? (
                            <Empty />
                        ) : null}
                    </Stack>
                ) : null}
            </Container>
        </>
    )
};
