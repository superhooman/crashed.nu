import { router } from "../trpc";
import { pccRouter } from "./pcc";
import { pdfRouter } from "./pdf";

export const appRouter = router({
  pcc: pccRouter,
  pdf: pdfRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
