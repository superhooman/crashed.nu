import { router } from "../trpc";
import { adminRouter } from "./admin";
import { pccRouter } from "./pcc";
import { registrarRouter } from "./registrar";
import { postsRouter } from "./social/posts";

export const appRouter = router({
  pcc: pccRouter,
  registrar: registrarRouter,
  posts: postsRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
