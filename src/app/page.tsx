import type { Metadata } from 'next';

import { Landing } from '@src/features/Landing';
import { DOMAIN } from '@src/constants/routes';

export const metadata: Metadata = {
    title: 'crashed.nu | home',
    description: 'A collection of some useful tools for Nazarbayev University students.',
    authors: [
        {
            name: 'superhooman',
            url: 'https://superhooman.co',
        },
    ],
    openGraph: {
        title: 'crashed.nu | home',
        description: 'A collection of some useful tools for Nazarbayev University students.',
        images: [
            '/og.png'
        ]
    },
    metadataBase: new URL(DOMAIN),
};

export default async function Home() {
    return (
        <Landing />
    );
}
