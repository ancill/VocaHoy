import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getToday, getTomorrow } from "../../../utils/api";

export const studySession = createTRPCRouter({
  getAllSessionsForUser: protectedProcedure.query(async ({ ctx }) => {
    // Close exposed session first
    console.log(getToday());
    await ctx.prisma.studySession.updateMany({
      data: {
        isSessionEnded: true,
      },
      where: {
        expires: {
          lte: getToday(),
        },
      },
    });
    return ctx.prisma.studySession.findMany({
      where: {
        userId: ctx.session.user.id,
        isSessionEnded: false,
      },
      include: {
        cardsCollection: true,
        _count: {
          select: {
            studyList: true,
          },
        },
      },
    });
  }),
  // get all cards study list for today
  getBySessionId: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      console.log(getTomorrow());
      return ctx.prisma.studySession.findFirst({
        where: {
          id: input.sessionId,
        },
        include: {
          studyList: {
            where: {
              nextReview: {
                lte: getTomorrow(),
              },
            },
          },
          cardsCollection: true,
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
          cardsCount: 0,
          masteredCount: 0,
          reviewCount: 0,
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
          _count: {
            select: {
              studyList: true,
            },
          },
        },
      });
    }),

  updateStudySession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        cardId: z.string(),
        nextReview: z.date(),
        interval: z.number(),
        masteredCount: z.number(),
        reviewCount: z.number(),
        cardsCount: z.number(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.studySession.update({
        where: {
          id: input.sessionId,
        },
        data: {
          reviewCount: input.reviewCount,
          masteredCount: input.masteredCount,
          cardsCount: input.cardsCount,
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
