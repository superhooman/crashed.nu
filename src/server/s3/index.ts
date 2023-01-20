import { S3 } from '@aws-sdk/client-s3';
import { env } from '../../env/server.mjs';

export const s3 = new S3({
    endpoint: env.S3_ENDPOINT,
    region: 'eu2',
    forcePathStyle: true,
    credentials: {
        accessKeyId: env.S3_ACCESS_KEY,
        secretAccessKey: env.S3_SECRET_KEY,
    },
});
