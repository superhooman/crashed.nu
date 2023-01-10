import React from 'react';
import { getServerAuthSession } from "@src/server/common/get-server-auth-session";
import { type NextPage, type GetServerSideProps } from "next";
import { prisma } from '@src/server/db/client';
import { type UserSchedule } from "@src/server/registrar/utils/parse";
import { Schedule } from '@src/features/schedule/calendar';
import { Head } from '@src/components/Head';

interface Props {
    schedule: UserSchedule;
    owner: boolean;
    sharable: boolean;
    url: string;
    name: string;
}

const SchedulePage: NextPage<Props> = ({ schedule, owner, sharable, url, name }) => {
    return (
        <>
            <Head
                title={`crashed.nu - ${name}`}
                description={`${name}'s schedule`}
                url={url}
                image="https://crashed.nu/cover2.png"
            />
            <Schedule
                owner={owner}
                schedule={schedule}
                sharable={sharable}
                url={url}
                name={name}
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

    const schedule = await prisma.userSchedule.findUnique({ where: { id }, include: { user: true }});

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

    let url = '';

    if (schedule.short) {
        url = 'https://crashed.nu/s/' + schedule.short;
    } else {
        url = 'https://crashed.nu/schedule/' + id;
    }

    return {
        props: {
            schedule: scheduleObject,
            name: schedule.user.name || 'Someone',
            owner,
            sharable,
            url,
        }
    }
}
