import { Head } from "@src/components/Head";
import { ROUTES } from "@src/constants/routes";
import { AuthForm } from "@src/features/auth/form";
import { getServerAuthSession } from "@src/server/common/get-server-auth-session";
import type { GetServerSideProps, NextPage } from "next";

const TITLE = 'crashed.nu - auth';
const DESCRIPTION = 'Sign in with your University account.';

const AuthPage: NextPage = () => {
    return (
        <>
            <Head
                title={TITLE}
                description={DESCRIPTION}
                url={ROUTES.AUTH.get({ full: true })}
            />
            <AuthForm />
        </>
    )
}

export default AuthPage;

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const session = await getServerAuthSession(ctx);

    if (session) {
        return {
            redirect: {
                destination: ROUTES.SCHEDULE.get(),
                permanent: false,
            }
        }
    }

    return {
        props: {},
    }
};
