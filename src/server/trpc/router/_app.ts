import { router } from "../trpc";
import { pccRouter } from "./pcc";

export const appRouter = router({
  pcc: pccRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
