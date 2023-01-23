import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import { prisma } from '@src/server/db/client';
import { type Sub as SubType, UserType } from "@prisma/client";
import { Sub } from "@src/features/social/Sub";
import { ROUTES } from "@src/constants/routes";
import { Head } from "@src/components/Head";
import { getServerAuthSession } from "@src/server/common/get-server-auth-session";

interface Props {
    subs: SubType[];
    sub: string;
}

const SubPage: NextPage<Props> = ({ subs, sub }) => {
    const selectedSub = subs.find(s => s.slug === sub);

    return (
        <>
            <Head
                title={`${selectedSub?.name} - /${selectedSub?.slug}`}
                description={`${selectedSub?.name} (${selectedSub?.slug}) on crashed.nu`}
                url={ROUTES.SUB.getWithParams({ id: sub }, { full: true })}
            />
            <Sub
                subs={subs}
                sub={sub}
            />
        </>
    )
}

export default SubPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const slug = ctx.params?.slug;
    const session = await getServerAuthSession(ctx);

    if (!session || !session.user) {
        return {
            redirect: {
                destination: ROUTES.AUTH.get(),
                permanent: false,
            }
        }
    }

    if (session.user.userType === UserType.PREUSER) {
        return {
            notFound: true,
        }
    }

    if (typeof slug !== 'string') {
        return {
            redirect: {
                destination: ROUTES.SUB.getWithParams({ id: 'all' }),
                permanent: false,
            }
        }
    }

    const exists = (await prisma.sub.count({
        where: {
            slug,
        },
    })) > 0;

    if (!exists) {
        return {
            notFound: true,
        }
    }

    const subs = await prisma.sub.findMany({});

    return {
        props: {
            subs,
            sub: slug,
        }
    }
}
