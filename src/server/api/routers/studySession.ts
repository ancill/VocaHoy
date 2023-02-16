import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getTomorrow } from "../../../utils/api";

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

      // create the deck session with the sessionCards field populated with the cards fetched above
      const session = await ctx.prisma.studySession.create({
        data: {
          cardsCollectionId: input.cardsCollectionId,
          userId: ctx.session.user.id,
          expires: getTomorrow(),
        },
      });

      const cardsFromCollection = await ctx.prisma.card.updateMany({
        where: {
          cardsCollectionId: input.cardsCollectionId,
        },
        data: {
          studySessionId: session.id,
        },
      });

      return ctx.prisma.studySession.findFirst({
        where: {
          id: session.id,
        },
        include: {
          studyList: true,
        },
      });
    }),

  // updateSessionAndCardReviewProgress: protectedProcedure
  //   .input(
  //     z.object({
  //       sessionId: z.string(),
  //       nextReview: z.date(),
  //       interval: z.number(),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     return ctx.prisma.studySession.update({
  //       where: {
  //         id: input.sessionId,
  //       },
  //       data: {
  //         studyList: {
  //           update: {},
  //         },
  //       },
  //     });
  //   }),

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
