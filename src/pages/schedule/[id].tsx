import React from 'react';
import { getServerAuthSession } from "@src/server/common/get-server-auth-session";
import { type NextPage, type GetServerSideProps } from "next";
import { prisma } from '@src/server/db/client';
import { type UserSchedule } from "@src/server/registrar/utils/parse";
import { Schedule } from '@src/features/schedule/calendar';
import { env } from '@src/env/server.mjs';
import { Head } from '@src/components/Head';

interface Props {
    schedule: UserSchedule;
    owner: boolean;
    sharable: boolean;
    url: string;
}

const SchedulePage: NextPage<Props> = ({ schedule, owner, sharable, url }) => {
    return (
        <>
            <Head
                title="crashed.nu - schedule"
                description="Shared schedule"
                url={url}
                image="https://crashed.nu/cover2.png"
            />
            <Schedule
                owner={owner}
                schedule={schedule}
                sharable={sharable}
                url={url}
            />
        </>
    )
}

export default SchedulePage;

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (ctx) => {
    const session = await getServerAuthSession(ctx);

    const id = ctx.params?.id;

    if (!id) {
        return {
            redirect: {
                destination: '/schedule',
                permanent: false,
            }
        }
    }

    const schedule = await prisma.userSchedule.findUnique({ where: { id }});

    if (!schedule) {
        return {
            redirect: {
                destination: '/schedule',
                permanent: false,
            }
        }
    }

    const owner = session?.user?.id === schedule.userId;

    if (!owner && !schedule.shared) {
        return {
            redirect: {
                destination: '/schedule',
                permanent: false,
            }
        }
    }

    const sharable = schedule.shared;

    const scheduleObject = {
        data: JSON.parse(schedule.data as string),
        preferences: JSON.parse(schedule.preferences as string),
    } as unknown as UserSchedule;

    return {
        props: {
            schedule: scheduleObject,
            owner,
            sharable,
            url: env.NEXTAUTH_URL + '/schedule/' + id,
        }
    }
}
