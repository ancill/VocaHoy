import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const deckRouter = createTRPCRouter({
  getDeckCollection: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.deckCollection.findMany();
  }),

  getCardsForCollection: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.card.findMany();
  }),
});
