import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

import { ROUTES } from '@src/constants/routes';
import { Settings } from '@src/features/Settings';
import { authOptions } from '@src/server/auth';
import { prisma } from '@src/server/db';

const Page = async () => {
    const session = await getServerSession(authOptions);

    if (!session) {
        return redirect(ROUTES.AUTH.get({ query: { callbackUrl: ROUTES.SETTINGS.get() } }));
    };

    const accounts = await prisma.account.findMany({
        where: {
            userId: session.user.id,
        },
        select: {
            provider: true,
        }
    });

    return (
        <Settings accounts={accounts} />
    );
};

export default Page;
