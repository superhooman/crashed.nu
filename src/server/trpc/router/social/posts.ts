import { commentSchema, postSchema } from "@src/schemas/post";
import { getPostsBySubSchema } from "@src/schemas/sub";
import Posts from "@src/server/social/posts";
import { z } from "zod";
import { protectedProcedure, router } from "../../trpc";

export const postsRouter = router({
    addPost: protectedProcedure
        .input(postSchema)
        .mutation(async ({ input: { sub, content, attachments }, ctx: { session } }) => await Posts.create(session.user.id, content, sub, attachments)),
    allPosts: protectedProcedure
        .query(async ({ ctx: { session: { user: { id } } } }) => await Posts.getAllPosts(id)),
    getPostsBySub: protectedProcedure
        .input(getPostsBySubSchema)
        .query(async ({ input: { sub, date, cursor, sort }, ctx: { session: { user: { id } } } }) => await Posts.getPostsBySub(sub, id, date, sort, cursor)),
    post: protectedProcedure
        .input(z.object({ id: z.string() }))
        .query(async ({ input: { id }, ctx: { session: { user: { id: userId } } } }) => await Posts.get(id, userId)),
    likePost: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id }, ctx: { session: { user: { id: userId } } } }) => await Posts.like(id, userId)),
    removePost: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id }, ctx: { session: { user: { id: userId, userType } } } }) => await Posts.removePost(id, userId, userType)),
    comments: protectedProcedure
        .input(z.object({ id: z.string(), cursor: z.date().optional() }))
        .query(async ({ input: { id, cursor } }) => await Posts.getComments(id, cursor)),
    addComment: protectedProcedure
        .input(commentSchema)
        .mutation(async ({ input: { postId, content }, ctx: { session: { user: { id: userId } } } }) => await Posts.addComment(postId, userId, content)),
    removeComment: protectedProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ input: { id }, ctx: { session: { user: { id: userId } } } }) => await Posts.removeComment(id, userId)),
    getAttachmentUploadUrl: protectedProcedure
        .mutation(async ({ ctx: { session: { user: { id: userId } } } }) => await Posts.getAttachmentUploadUrl(userId)),
});
