import type { NextPage } from 'next';

import { Head } from '@src/components/Head';
import { ROUTES } from '@src/constants/routes';
import { DefaultError } from '@src/features/error/DefaultError';

const PrivatePage: NextPage = () => {
    return (
        <>
            <Head
                title="A private schedule"
                description="The schedule you are trying to access is private"
                url={ROUTES.PRIVATE.get({ full: true })}
            />
            <DefaultError
                title="Private"
                text="The schedule you are trying to access is private"
            />
        </>
    );
};

export default PrivatePage;
