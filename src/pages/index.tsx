import type { NextPage } from 'next';

import { Landing } from '@src/features/landing';
import { Head } from '@src/components/Head';
import { DOMAIN } from '@src/constants/routes';

const Home: NextPage = () => {
  return (
    <>
        <Head
            title="crashed.nu - a collection of useful tools"
            description="Get your perfect schedule in constructor!"
            url={DOMAIN}
        />
        <Landing />
    </>
  );
};

export default Home;
