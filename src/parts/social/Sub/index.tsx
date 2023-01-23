import React from 'react';
import { HeartIcon, MagicWandIcon } from '@radix-ui/react-icons';
import Link from 'next/link';
import clsx from 'clsx';

import type { Sub as SubType } from '@prisma/client';
import type { Sort } from '@src/schemas/sub';

import { Button } from '@src/components/Button';
import { Divider } from '@src/components/Divider';
import { Header } from '@src/components/Header';
import { Loader } from '@src/components/Loader';
import { Post } from '@src/parts/social/Post';
import { Select } from '@src/components/Select';
import { Stack } from '@src/components/Stack';
import { Text } from '@src/components/Typography';
import { trpc } from '@src/utils/trpc';
import { Empty } from '@src/components/Empty';
import { SLUG_TO_ICON } from '@src/constants/slugToIcon';
import { ROUTES } from '@src/constants/routes';

import cls from './Sub.module.scss';
import { SubLayout } from './layout';
import { NewPost } from '../NewPost';

interface Props {
    subs: SubType[];
    sub: string;
}

const SORT_OPTIONS = [
    {
        label: (
            <Stack gap={8} alignItems="center">
                <MagicWandIcon />
                <span>New</span>
            </Stack>
        ),
        value: 'new',
    },
    {
        label: (
            <Stack gap={8} alignItems="center">
                <HeartIcon />
                <span>Top (24h)</span>
            </Stack>
        ),
        value: 'top',
    },
];

export const Sub: React.FC<Props> = ({ subs, sub: propSub }) => {
    const [sub, setSub] = React.useState(propSub);

    const [sort, setSort] = React.useState<Sort>('new');

    const [date, setDate] = React.useState(new Date());

    const updateDate = React.useCallback(() => {
        setDate(new Date());
    }, []);

    React.useEffect(() => {
        setSub(propSub);
        updateDate();
    }, [propSub, updateDate]);

    const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = trpc.posts.getPostsBySub.useInfiniteQuery({ sub, date, sort }, {
        getNextPageParam: (lastPage) => {
            return lastPage.nextCursor;
        },
        refetchOnWindowFocus: false,
        keepPreviousData: true,
    });

    const posts = React.useMemo(() => {
        return data?.pages.flatMap(({ items }) => items) || [];
    }, [data]);

    const newPosts = React.useMemo(() => {
        return (data?.pages.at(-1)?.hasNew ?? 0);
    }, [data]);

    const showPosts = React.useMemo(() => {
        return !isLoading && posts.length > 0;
    }, [isLoading, posts.length]);

    const showEmpty = React.useMemo(() => {
        return !isLoading && posts.length === 0;
    }, [isLoading, posts.length]);

    const showLoading = React.useMemo(() => {
        return isLoading || isFetchingNextPage;
    }, [isLoading, isFetchingNextPage]);

    return (
        <SubLayout
            header={<Header fixed sub={sub} />}
            sub={subs.find(s => s.slug === sub)}
            side={
                <Stack direction="column" gap={4}>
                    {subs.map(({ slug, name }) => {
                        const Icon = SLUG_TO_ICON[slug];
                        return (
                            <Link className={clsx(cls.subLink, sub === slug ? cls.active : '')} key={slug} href={ROUTES.SUB.getWithParams({ id: slug })}>
                                {Icon && <Icon />}
                                <Text className={cls.name}>{name}</Text>
                            </Link>
                        );
                    })}
                </Stack>
            }
        >
                <Stack direction="column" gap={8}>
                    <NewPost
                        onSuccess={updateDate}
                        sub={sub}
                    />
                    <Stack alignItems="center" className={cls.section} gap={12} fullWidth>
                        <Divider className={cls.divider} />
                        <Select
                            value={sort}
                            onValueChange={value => {
                                updateDate();
                                setSort(value as Sort);
                            }}
                            items={SORT_OPTIONS}
                        />
                    </Stack>
                    {
                        newPosts > 0 && (
                            <Button fullWidth onClick={updateDate}>New posts ({newPosts})</Button>
                        )
                    }
                    {showPosts ? (
                        <Stack direction="column" gap={8}>
                            {posts.map(post => (
                                <Post
                                    key={post.id}
                                    post={post}
                                />
                            ))}
                        </Stack>
                    ) : null}
                    {showEmpty ? (<Empty />) : null}
                    {showLoading ? (
                        <Stack className={cls.section} gap={8} alignItems="center" justifyContent="center">
                            <Loader />
                            <Text size="small">Loading...</Text>
                        </Stack>
                    ) : null}
                    {hasNextPage && !isFetchingNextPage ? (
                        <div style={{ paddingTop: 8 }}>
                            <Button fullWidth onClick={() => fetchNextPage()}>Load more</Button>
                        </div>
                    ) : null}
                </Stack>
        </SubLayout>
    );
};
