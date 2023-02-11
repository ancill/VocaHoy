import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const studySession = createTRPCRouter({
  getStudySession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.studySession.findFirst({
        where: {
          id: input.sessionId,
        },
        include: {
          studyList: true,
        },
      });
    }),

  createStudySession: protectedProcedure
    .input(
      z.object({
        deckCollectionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const today = new Date();
      const cardsForStudy =
        await ctx.prisma.personalCardReviewProgress.findMany({
          where: {
            userId: ctx.session.user.id,
            card: {
              cardsCollectionId: input.deckCollectionId,
            },
            nextReview: {
              gte: today,
              lt: today,
            },
          },
          take: 100,
        });

      // create the deck session with the sessionCards field populated with the cards fetched above
      return ctx.prisma.studySession.create({
        data: {
          studyList: {
            connect: cardsForStudy.map((card) => ({ id: card.id })),
          },
          userId: ctx.session.user.id,
        },
      });
    }),

  updateStudySession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        isSessionEnded: z.boolean(),
        nextReview: z.date(),
        interval: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const cardsForStudy =
        await ctx.prisma.personalCardReviewProgress.updateMany({
          data: {
            nextReview: input.nextReview,
            interval: input.interval,
          },
          where: {
            studySessionId: input.sessionId,
          },
        });
      return ctx.prisma.studySession.update({
        where: {
          id: input.sessionId,
        },
        data: {
          isSessionEnded: input.isSessionEnded,
        },
      });
    }),
});
