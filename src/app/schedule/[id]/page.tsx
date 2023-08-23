import { getServerSession } from 'next-auth';
import { notFound, redirect } from 'next/navigation';

import type { Metadata } from 'next';

import { ROUTES } from '@src/constants/routes';
import { Schedule } from '@src/features/Schedule';
import { authOptions } from '@src/server/auth';
import { prisma } from '@src/server/db';


interface Props {
    params: {
        id: string;
    };
}

export async function generateMetadata(
    { params }: Props,
): Promise<Metadata> {
    const id = params.id;

    const schedule = await prisma.userSchedule.findFirst({
        where: { id }, select: {
            user: {
                select: {
                    name: true,
                }
            }
        }
    });

    return {
        title: `${schedule?.user.name}'s Schedule | crashed.nu`,
        openGraph: {
            title: `${schedule?.user.name}'s Schedule | crashed.nu`,
        },
    };
}

const Page = async ({ params: { id } }: Props) => {
    const schedule = await prisma.userSchedule.findFirst({
        where: { id }, include: {
            user: {
                select: {
                    name: true,
                    image: true,
                }
            }
        }
    });

    if (!schedule) {
        return notFound();
    };

    const session = await getServerSession(authOptions);

    const isOwner = session?.user?.id === schedule.userId;

    let hasMicrosoft: boolean | undefined = undefined;

    if (isOwner) {
        hasMicrosoft = !!(await prisma.account.findFirst({
            where: {
                userId: session.user.id,
                provider: 'azure-ad',
            },
        }));
    }

    if (!schedule.shared && !isOwner) {
        return redirect(ROUTES.PRIVATE.get());
    }

    return (
        <Schedule
            isOwner={isOwner}
            hasMicrosoft={hasMicrosoft}
            schedule={schedule}
        />
    );
};

export default Page;
