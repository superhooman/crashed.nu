import type { ParsedUrlQuery } from 'querystring';

import { ROUTES } from '@src/constants/routes';
import { Auth } from '@src/features/Auth';
import { getParam } from '@src/utils/query/getParam';

interface PageProps {
    searchParams: ParsedUrlQuery;
}

const AuthPage = ({ searchParams }: PageProps) => {
    const callbackUrl = getParam(searchParams.callbackUrl) ?? ROUTES.HOME.get();
    const error = getParam(searchParams.error);

    return (
        <Auth callbackUrl={callbackUrl} error={error} />
    );
};

export default AuthPage;
