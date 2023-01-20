import { type Prisma, UserType, AttachmentType } from "@prisma/client";
import { NotificationsType } from "@prisma/client";
import { ROUTES } from "@src/constants/routes";
import type { Sort } from "@src/schemas/sub";
import { TRPCError } from "@trpc/server";
import { prisma } from "../db/client";
import { getEmail } from "./utils/getUserHandle";

const defaultWhere = {
    deleted: false,
} as const;

const defaultInclude = {
    user: true,
    attachments: true,
    likes: {
        select: {
            userId: true,
        },
    },
    comments: {
        select: {
            userId: true,
        },
        where: {
            deleted: false,
        }
    }
} as const;

const defaultOrder = {
    date: 'desc',
} as const;

const MENTIONS = /@([a-z0-9._]+)/gi;

class Posts {
    public async create(userId: string, body: string, subSlug: string, attachments?: string[]) {
        const sub = await prisma.sub.findUnique({
            where: {
                slug: subSlug,
            },
        });

        if (!sub) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        let content = body;

        const mentions = content.match(MENTIONS);

        if (mentions) {
            const users = await prisma.user.findMany({
                where: {
                    email: {
                        in: mentions.map((mention) => getEmail(mention.replace('@', ''))),
                    }
                },
                select: {
                    email: true,
                },
            });

            const emails = users.map((user) => user.email);

            mentions.filter((mention) => emails.includes(getEmail(mention.replace('@', '')))).map(async (mention) => {
                const handle = mention.replace('@', '');
                content = content.replaceAll(mention, `[${mention}](${ROUTES.PROFILE.getWithParams({ id: handle })}})`);
            });
        }

        return await prisma.post.create({
            data: {
                content,
                userId,
                subId: sub.slug,
                attachments: {
                    connect: attachments?.map((attachment) => ({
                        id: attachment,
                    })),
                }
            },
        });
    }

    public async get(id: string, userId: string) {
        const post = await prisma.post.findFirst({
            where: {
                id,
                ...defaultWhere,
            },
            include: defaultInclude,
        });

        if (!post) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        return {
            ...post,
            likes: post.likes.length,
            comments: post.comments.length,
            liked: post.likes.some((like) => like.userId === userId),
        };
    }

    public async like(id: string, userId: string) {
        const post = await prisma.post.findFirst({
            where: {
                id,
                ...defaultWhere,
            },
        });

        if (!post) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        const exists = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId: post.id,
                },
            },
        });

        if (exists) {
            await prisma.like.delete({
                where: {
                    userId_postId: {
                        userId,
                        postId: post.id,
                    }
                }
            });

            await prisma.notifications.delete({
                where: {
                    forId_fromId_type_entityId: {
                        forId: post.userId,
                        fromId: userId,
                        type: NotificationsType.LIKE,
                        entityId: post.id,
                    }
                },
            });

            return false;
        }

        await prisma.like.create({
            data: {
                userId,
                postId: post.id,
            },
        });

        await prisma.notifications.create({
            data: {
                forId: post.userId,
                type: NotificationsType.LIKE,
                fromId: userId,
                entityId: post.id,
            },
        });

        return true;
    }

    public async getAllPosts(userId: string) {
        const posts = await prisma.post.findMany({
            where: defaultWhere,
            include: defaultInclude,
            orderBy: defaultOrder,
        });

        return posts.map((post) => ({
            ...post,
            likes: post.likes.length,
            comments: post.comments.length,
            liked: post.likes.some((like) => like.userId === userId),
        }));
    }

    public async getPostsBySub(sub: string, userId: string, date: Date, sort: Sort, cursor?: string) {
        const take = 10;

        const hasNew = await prisma.post.count({
            where: {
                subId: sub,
                date: {
                    gt: date,
                },
                ...defaultWhere,
            },
        });

        const orderBy: Prisma.PostOrderByWithRelationInput = (() => {
            if (sort === 'new') {
                return defaultOrder;
            }

            if (sort === 'top') {
                return {
                    likes: {
                        _count: 'desc',
                    }
                };
            }

            return {
                comments: {
                    _count: 'desc',
                }
            };
        })();

        const additionalWhere: Prisma.PostWhereInput = (() => {
            if (sort === 'new') {
                return {
                    date: {
                        lt: date,
                    },
                };
            }

            const last24Hours = new Date();
            last24Hours.setDate(last24Hours.getDate() - 1);

            return {
                date: {
                    lt: date,
                    gt: last24Hours,
                },
            };
        })();


        const posts = await prisma.post.findMany({
            take: take + 1,
            cursor: cursor ? { id: cursor } : undefined,
            where: {
                subId: sub,
                ...additionalWhere,
                ...defaultWhere,
            },
            include: defaultInclude,
            orderBy,
        });

        let nextCursor: string | undefined = undefined;

        if (posts.length > take) {
            nextCursor = posts.pop()!.id;
        }

        const items = posts.map((post) => ({
            ...post,
            likes: post.likes.length,
            comments: post.comments.length,
            liked: post.likes.some((like) => like.userId === userId),
        }));

        return {
            items,
            nextCursor,
            hasNew
        };
    }

    public async removePost(id: string, userId: string, userType: UserType) {
        const isAdmin = userType === UserType.ADMIN;

        const post = await prisma.post.findFirst({
            where: {
                id,
                deleted: false,
                userId: isAdmin ? undefined : userId,
            },
            select: {
                id: true
            }
        });

        if (!post) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        const comments = await prisma.comment.findMany({
            where: {
                postId: post.id,
            },
            select: {
                id: true,
            }
        });

        await prisma.comment.updateMany({
            where: {
                postId: post.id,
            },
            data: {
                deleted: true,
            },  
        });

        await prisma.notifications.deleteMany({
            where: {
                OR: [
                    {
                        entityId: post.id,
                    },
                    {
                        entityId: {
                            in: comments.map((comment) => comment.id),
                        },
                    }
                ],
            },
        });

        await prisma.like.deleteMany({
            where: {
                postId: post.id,
            },
        });

        await prisma.post.update({
            where: {
                id,
            },
            data: {
                deleted: true,
            },
        });

        return true;
    }

    public async getComments(postId: string, cursor?: Date) {
        const take = 10;

        const comments = await prisma.comment.findMany({
            where: {
                postId,
                deleted: false,
                ...cursor ? {
                    date: {
                        gte: cursor,
                    },
                } : {},
            },
            include: {
                user: true,
            },
            take: take + 1,
            orderBy: {
                date: 'asc',
            },
        });

        let nextCursor: typeof cursor | undefined = undefined;

        if (comments.length > take) {
            const nextItem = comments.pop();
            nextCursor = nextItem!.date;
        }

        return {
            items: comments,
            nextCursor,
        };
    }

    public async addComment(postId: string, userId: string, body: string) {
        let content = body;

        const mentions = content.match(MENTIONS);

        const post = await prisma.post.findFirst({
            where: {
                id: postId,
                ...defaultWhere,
            },
        });

        if (!post) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        if (mentions) {
            const users = await prisma.user.findMany({
                where: {
                    email: {
                        in: mentions.map((mention) => getEmail(mention.replace('@', ''))),
                    }
                },
                select: {
                    email: true,
                },
            });

            const emails = users.map((user) => user.email);

            mentions.filter((mention) => emails.includes(getEmail(mention.replace('@', '')))).map(async (mention) => {
                content = content.replaceAll(mention, `[${mention}](/profile/${mention.replace('@', '')})`);
            });
        }

        return await prisma.comment.create({
            data: {
                content,
                userId,
                postId,
            },
        });
    }

    public async removeComment(id: string, userId: string) {
        const comment = await prisma.comment.findFirst({ where: { id, deleted: false, userId }, select: { id: true } });

        if (!comment) {
            throw new TRPCError({ code: 'NOT_FOUND' });
        }

        await prisma.comment.update({
            where: {
                id,
            },
            data: {
                deleted: true,
            }
        });

        return true;
    }

    public async getAttachmentUploadUrl(userId: string) {
        const attachemnt = await prisma.attachment.create({
            data: {
                userId,
                type: AttachmentType.IMAGE,
            }
        });

        return ROUTES.ATTACHMENT_UPLOAD.getWithParams({ id: attachemnt.id });
    }
}

export default new Posts();
