import { Head } from "@src/components/Head";
import { AuthForm } from "@src/features/auth/form";
import type { NextPage } from "next";

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
