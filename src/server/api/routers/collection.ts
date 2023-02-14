import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const collectionRouter = createTRPCRouter({
  getCardsCollection: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.cardsCollection.findMany();
  }),
});
