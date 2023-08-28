await import("./src/env.mjs");

import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
    },
    redirects: async () => {
        return [
            {
                source: '/construct',
                destination: '/builder',
                permanent: true,
            },
            {
                source: '/constructor',
                destination: '/builder',
                permanent: true,
            }
        ];
    }
}

export default withVanillaExtract(nextConfig);