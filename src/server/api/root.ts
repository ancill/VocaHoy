import { collectionRouter } from "./routers/collection";
import { studySession } from "./routers/studySession";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  cardsCollection: collectionRouter,
  studySession: studySession,
});

// export type definition of API
export type AppRouter = typeof appRouter;
