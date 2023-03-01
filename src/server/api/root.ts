import { cardsRouter } from "./routers/cards";
import { collectionRouter } from "./routers/collection";
import { studySession } from "./routers/studySession";
import { usersRouter } from "./routers/users";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  cardsCollection: collectionRouter,
  studySession: studySession,
  users: usersRouter,
  cards: cardsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
