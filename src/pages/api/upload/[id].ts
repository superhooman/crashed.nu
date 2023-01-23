import busboy from 'busboy';

import type { NextApiHandler, NextApiRequest } from 'next';

import { getServerAuthSession } from '@src/server/common/get-server-auth-session';
import { prisma } from '@src/server/db/client';
import { env } from '@src/env/server.mjs';
import { s3 } from '@src/server/s3';

const processFile = (req: NextApiRequest): Promise<{
    data: Buffer;
    mimeType: string;
}> => new Promise((resolve, reject) => {
    const bb = busboy({ headers: req.headers });
    bb.on('file', (_, file, info) => {
        const { mimeType } = info;
        if (!mimeType.startsWith('image/')) {
            reject(new Error('File is not an image'));
            return;
        }

        const chunks: Buffer[] = [];

        file.on('data', (chunk) => {
            chunks.push(chunk);
        });

        file.on('end', () => {
            resolve({
                data: Buffer.concat(chunks),
                mimeType,
            });
        });
    });

    bb.once;
    req.pipe(bb);
});

const handler: NextApiHandler = async (req, res) => {
    const session = await getServerAuthSession({ req, res });

    if (!session) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const id = req.query.id as string;

    if (!id) {
        return res.status(400).json({ error: 'Missing id' });
    }

    const file = await processFile(req).catch(() => null);

    if (!file) {
        return res.status(400).json({ error: 'Invalid file' });
    }

    const attachment = await prisma.attachment.findUnique({
        where: {
            id,
        },
    });

    if (!attachment) {
        return res.status(404).json({ error: 'Attachment not found' });
    }

    const params = {
        Bucket: env.S3_BUCKET_NAME,
        Key: `attachments/${id}`,
        Body: file.data,
        ContentType: file.mimeType,
    };

    const object = await s3.putObject(params).catch(() => null);

    if (!object) {
        return res.status(500).json({ error: 'Unable to upload file' });
    }

    const size = Buffer.byteLength(file.data);

    await prisma.attachment.update({
        where: {
            id,
        },
        data: {
            uploaded: true,
            size,
        },
    });

    return res.status(200).json({
        success: true,
        id,
    });
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default handler;
