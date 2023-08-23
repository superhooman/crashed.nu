import { notFound, redirect } from 'next/navigation';

import { ROUTES } from '@src/constants/routes';
import { prisma } from '@src/server/db';

interface Props {
    params: {
        id: string;
    };
}

const Page = async ({ params: { id } }: Props) => {
    const schedule = await prisma.userSchedule.findUnique({ where: { short: id }, select: { id: true } });

    if (!schedule) {
        return notFound();
    }

    return redirect(ROUTES.SCHEDULE_ID.getWithParams({ id: schedule.id }));
};

export default Page;
