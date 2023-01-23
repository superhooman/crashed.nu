import type { User } from '@prisma/client';
import type { GetServerSideProps, NextPage } from 'next';

import { ROUTES } from '@src/constants/routes';
import { getServerAuthSession } from '@src/server/common/get-server-auth-session';
import { prisma } from '@src/server/db/client';
import { getEmail } from '@src/server/social/utils/getUserHandle';
import { Profile } from '@src/parts/social/Profile';

interface ProfilePageProps {
    user: User;
}

const ProfilePage: NextPage<ProfilePageProps> = ({ user }) => {
    return (
        <>
            <Profile
                user={user}
            />
        </>
    );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async (ctx) => {
    const handle = ctx.params?.handle as string | undefined;
    const session = await getServerAuthSession(ctx);

    if (!session) {
        return {
            redirect: {
                destination: ROUTES.AUTH.get(),
                permanent: false,
            },
        };
    }

    if (!handle) {
        return {
            notFound: true,
        };
    }

    const user = await prisma.user.findUnique({ where: {
        email: getEmail(handle)
    } });

    if (!user) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            user,
        },
    };
};
