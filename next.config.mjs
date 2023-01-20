// @ts-check
/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation.
 * This is especially useful for Docker builds.
 */
import { env } from "./src/env/server.mjs";

/** @type {import("next").NextConfig} */
const config = {
  reactStrictMode: true,
  swcMinify: true,
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  async redirects() {
    return [
      {
        source: '/constructor',
        destination: '/construct',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/bee.js',
        destination: 'https://cdn.splitbee.io/sb.js',
      },
      {
        source: '/_hive/:slug',
        destination: 'https://hive.splitbee.io/:slug',
      },
      {
        source: '/s3/:folder/:path*',
        destination: `${env.S3_ENDPOINT}/${env.S3_TENANT_ID}%3A${env.S3_BUCKET_NAME}/:folder/:path*`,
      },
    ];
  },
};
export default config;
