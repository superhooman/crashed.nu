import { z } from "zod";

export const postSchema = z.object({
    content: z.string().min(1).max(1024),
    sub: z.string(),
    attachments: z.array(z.string()).optional(),
});

export const commentSchema = z.object({
    content: z.string().min(1).max(256),
    postId: z.string(),
});
