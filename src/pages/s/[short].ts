import type { GetServerSideProps } from "next"
import { prisma } from '@src/server/db/client';

export default function Short() {
    return null;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const short = ctx.params?.short as string | undefined;

    if (!short) {
        return {
            notFound: true
        }
    }

    const schedule = await prisma.userSchedule.findUnique({ where: { short }, select: { id: true } });

    if (!schedule) {
        return {
            notFound: true,
        }
    }

    return {
        redirect: {
            destination: `/schedule/${schedule.id}`,
            permanent: true,
        },
    };
}
