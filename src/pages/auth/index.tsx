import { Head } from "@src/components/Head";
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
                url="https://crashed.nu/auth"
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
                destination: '/schedule',
                permanent: false,
            }
        }
    }

    return {
        props: {},
    }
};
