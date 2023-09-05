import type { Metadata } from 'next';

import { Landing } from '@src/features/Landing';

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
};

export default async function Home() {
    return (
        <Landing />
    );
}
