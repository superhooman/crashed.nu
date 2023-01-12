import { Head } from "@src/components/Head";
import { Registrar } from "@src/features/schedule/registrar";
import type { NextPage} from "next";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from '@src/server/common/get-server-auth-session';
import { prisma } from '@src/server/db/client';
import { getQuery } from "@src/utils/getQuery";
import { ROUTES } from "@src/constants/routes";

interface Props {
    refetch?: boolean;
}

const Schedule: NextPage<Props> = ({ refetch }) => {
    return (
        <>
            <Head
                title="crashed.nu - schedule"
                description="Your schedule"
                url={ROUTES.SCHEDULE.get({ full: true })}
            />
            <Registrar refetch={refetch} />
        </>
    )
}

export default Schedule;

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    const session = await getServerAuthSession(ctx);

    if (!session || !session.user) {
        return {
            redirect: {
                destination: ROUTES.AUTH.get(),
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
                refetch: Boolean(refetch),
            },
        }
    }

    return {
        redirect: {
            destination: ROUTES.SCHEDULE_ID.getWithParams({ id: schedule.id }),
            permanent: false,
        }
    }
}
