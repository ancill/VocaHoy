import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const studySession = createTRPCRouter({
  getBySessionId: protectedProcedure
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
  getByCollectionId: protectedProcedure
    .input(
      z.object({
        cardsCollectionId: z.string(),
        isSessionEnded: z.boolean(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.studySession.findFirst({
        where: {
          cardsCollectionId: input.cardsCollectionId,
          userId: ctx.session.user.id,
          isSessionEnded: input.isSessionEnded,
        },
        include: {
          studyList: true,
        },
      });
    }),

  create: protectedProcedure
    .input(
      z.object({
        cardsCollectionId: z.string(),
        cardLimitPerSession: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tomorrow = new Date(); // The Date object returns today's timestamp
      tomorrow.setDate(tomorrow.getDate() + 1);

      // Session started by collecting cards from main collection and put them in review
      // Then populate session card collection by that cards
      const cardsFromCollection = await ctx.prisma.card.findMany({
        where: {
          id: input.cardsCollectionId,
        },
        take: input.cardLimitPerSession,
      });

      // create the deck session with the sessionCards field populated with the cards fetched above
      return ctx.prisma.studySession.create({
        data: {
          cardsCollectionId: input.cardsCollectionId,
          studyList: {
            createMany: {
              data: cardsFromCollection,
            },
          },

          expires: new Date(),
        },
        include: {
          studyList: true,
        },
      });
    }),

  updateSessionAndCardReviewProgress: protectedProcedure
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

  closeSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.studySession.update({
        where: {
          id: input.sessionId,
        },
        data: {
          isSessionEnded: true,
        },
      });
    }),
});
