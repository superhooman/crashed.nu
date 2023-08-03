import React from 'react';
import { type NextPage, type GetServerSideProps } from 'next';

import { getServerAuthSession } from '@src/server/common/get-server-auth-session';
import { prisma } from '@src/server/db/client';
import { type UserSchedule } from '@src/server/registrar/utils/parse';
import { Calendar } from '@src/parts/schedule/Calendar';
import { Head } from '@src/components/Head';
import { ROUTES } from '@src/constants/routes';

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
            />
            <Calendar
                owner={owner}
                schedule={schedule}
                sharable={sharable}
                url={url}
                name={name}
            />
        </>
    );
};

export default SchedulePage;

export const getServerSideProps: GetServerSideProps<Props, { id: string }> = async (ctx) => {
    const session = await getServerAuthSession(ctx);
    const destination = ROUTES.SCHEDULE.get();

    const id = ctx.params?.id;

    if (!id) {
        return {
            redirect: {
                destination,
                permanent: false,
            }
        };
    }

    const schedule = await prisma.userSchedule.findUnique({ where: { id }, include: { user: true }});

    if (!schedule) {
        return {
            redirect: {
                destination,
                permanent: false,
            }
        };
    }

    const owner = session?.user?.id === schedule.userId;

    if (!owner && !schedule.shared) {
        return {
            redirect: {
                destination: ROUTES.PRIVATE.get(),
                permanent: false,
            }
        };
    }

    const sharable = schedule.shared;

    const scheduleObject = {
        data: JSON.parse(schedule.data as string),
        preferences: JSON.parse(schedule.preferences as string),
    } as unknown as UserSchedule;

    let url = '';

    if (schedule.short) {
        url = ROUTES.SCHEDULE_SHORT.getWithParams({ id: schedule.short }, { full: true });
    } else {
        url = ROUTES.SCHEDULE_ID.getWithParams({ id }, { full: true });
    }

    console.log({
        session,
        schedule: scheduleObject,
        name: schedule.user.name || 'Someone',
        owner,
        sharable,
        url,
    });

    return {
        props: {
            session,
            schedule: scheduleObject,
            name: schedule.user.name || 'Someone',
            owner,
            sharable,
            url,
        }
    };
};
