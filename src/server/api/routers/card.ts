import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const cardRouter = createTRPCRouter({
  getAllCardsForToday: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.cardIntervalState.findFirst({
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
