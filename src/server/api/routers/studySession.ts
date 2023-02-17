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
          studyList: {
            where: {
              nextReview: {
                lt: getTomorrow(),
              },
            },
          },
          cardsCollection: true,
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
      const session = await ctx.prisma.studySession.create({
        data: {
          cardsCollectionId: input.cardsCollectionId,
          userId: ctx.session.user.id,
          expires: getTomorrow(),
        },
      });

      await ctx.prisma.card.updateMany({
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

  updateSessionCard: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        cardId: z.string(),
        nextReview: z.date(),
        interval: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.studySession.update({
        where: {
          id: input.sessionId,
        },
        data: {
          studyList: {
            update: {
              data: {
                interval: input.interval,
                nextReview: input.nextReview,
              },
              where: {
                id: input.cardId,
              },
            },
          },
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
