import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const deckSession = createTRPCRouter({
  getAllCardsForToday: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.cardInterval.findFirst({
      where: {
        userId: ctx.session.user.id,
        nextReview: {
          gte: new Date(),
          lt: new Date(),
        },
      },
    });
  }),
});
