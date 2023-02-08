import { createTRPCRouter } from "./trpc";
import { deckRouter } from "./routers/deck";
import { deckSession } from "./routers/deckSession";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  deck: deckRouter,
  deckSession: deckSession,
});

// export type definition of API
export type AppRouter = typeof appRouter;
