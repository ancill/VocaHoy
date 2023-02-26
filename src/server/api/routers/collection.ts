import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const collectionRouter = createTRPCRouter({
  getCardsCollection: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.cardsCollection.findMany();
  }),

  createCollection: protectedProcedure
    .input(
      z.object({
        cardsCollectionId: z.string(),
        isSessionEnded: z.boolean(),
      })
    )
    .mutation(({ ctx, input }) => {}),
});
