import { router } from '../trpc';
import { pccRouter } from './pcc';
import { registrarRouter } from './registrar';

export const appRouter = router({
  pcc: pccRouter,
  registrar: registrarRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
