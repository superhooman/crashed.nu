await import("./src/env.mjs");

import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: "/construct",
                destination: "/builder",
                permanent: true,
            },
            {
                source: "/constructor",
                destination: "/builder",
                permanent: true,
            },
        ];
    },
    async rewrites() {
        return [
            {
                source: "/bee.js",
                destination: "https://cdn.splitbee.io/sb.js",
            },
            {
                source: "/_hive/:slug",
                destination: "https://hive.splitbee.io/:slug",
            },
        ];
    },
};

export default withVanillaExtract(nextConfig);
