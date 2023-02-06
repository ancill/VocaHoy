import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const deckSession = createTRPCRouter({
  getSession: protectedProcedure
    .input(
      z.object({
        deckCollectionId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.deckSession.findFirst({
        where: {
          deckCollectionId: input.deckCollectionId,
        },
      });
    }),

  createSession: protectedProcedure
    .input(
      z.object({
        deckCollectionId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.deckSession.create({
        data: {
          deckCollectionId: input.deckCollectionId,
          userId: ctx.session.user.id,
        },
      });
    }),

  updateSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        mastered: z.number(),
        progress: z.number(),
        review: z.number(),
        new: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.deckSession.update({
        where: {
          sessionId: input.sessionId,
        },
        data: {
          mastered: input.mastered,
          progress: input.progress,
          review: input.review,
          new: input.new,
        },
      });
    }),
});
