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
          studyList: {
            include: {
              card: true,
            },
          },
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
        cardLimitPerSession: z.number()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const tomorrow = new Date(); // The Date object returns today's timestamp
      tomorrow.setDate(tomorrow.getDate() + 1);



      const cardsFromCollection = await ctx.prisma.cardsCollection.findMany({
        where: {
          id: input.cardsCollectionId,
        },
        select: {
          cards: {
            take: input.cardLimitPerSession
          }
        },
        
      })

      const cardsForStudy =
        await ctx.prisma.personalCardReviewProgress.createMany({
        data: {
          cardId: 
        }
        });

      // const cardsForStudy =
      //   await ctx.prisma.personalCardReviewProgress.findMany({
      //     where: {
      //       userId: ctx.session.user.id,
      //       card: {
      //         cardsCollectionId: input.cardsCollectionId,
      //       },
      //       nextReview: {
      //         lt: tomorrow,
      //       },
      //     },
      //     take: 100,
      //   });
      console.log(cardsForStudy);
      // create the deck session with the sessionCards field populated with the cards fetched above
      return ctx.prisma.studySession.create({
        data: {
          cardsCollectionId: input.cardsCollectionId,
          studyList: {
            connect: cardsForStudy.map((card) => ({ id: card.id })),
          },
          userId: ctx.session.user.id,
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
