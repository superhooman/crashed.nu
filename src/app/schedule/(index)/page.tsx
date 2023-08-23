import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import type { ParsedUrlQuery } from 'querystring';

import { ROUTES } from '@src/constants/routes';
import { Sync } from '@src/features/Sync';
import { authOptions } from '@src/server/auth';
import { prisma } from '@src/server/db';
import { getParam } from '@src/utils/query/getParam';


interface PageProps {
    searchParams: ParsedUrlQuery;
}

const SyncPage = async ({ searchParams }: PageProps) => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect(ROUTES.AUTH.get({
            query: {
                callbackUrl: ROUTES.SCHEDULE.get(),
            },
        }));
    }

    const isRefetch = getParam(searchParams.refetch) === '1';

    if (!isRefetch) {
        const schedule = await prisma.userSchedule.findFirst({
            where: {
                userId: session.user.id,
            },
            select: {
                id: true,
            },
        });

        if (schedule) {
            return redirect(ROUTES.SCHEDULE_ID.getWithParams({ id: schedule.id }));
        }
    }

    return (
        <Sync isRefetch={isRefetch} />
    );
};

export default SyncPage;
