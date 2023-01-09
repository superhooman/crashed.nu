import { Head } from "@src/components/Head";
import { Registrar } from "@src/features/schedule/registrar";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from '@src/server/common/get-server-auth-session';
import { prisma } from '@src/server/db/client';
import { getQuery } from "@src/utils/getQuery";

const Schedule = () => {
    return (
        <>
            <Head
                title="crashed.nu - schedule"
                description="Your schedule"
                url="https://crashed.nu/schedule"
                image="https://crashed.nu/cover2.png"
            />
            <Registrar />
        </>
    )
}

export default Schedule;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);

    if (!session || !session.user) {
        return {
            redirect: {
                destination: '/auth',
                permanent: false,
            }
        }
    }

    const schedule = await prisma.userSchedule.findFirst({
        where: {
            userId: session.user.id,
        },
        select: {
            id: true,
        },
    });

    const refetch = getQuery(ctx.query.refetch);

    if (!schedule || refetch) {
        return {
            props: {
                session,
            },
        }
    }

    return {
        redirect: {
            destination: '/schedule/' + schedule.id,
            permanent: false,
        }
    }
}