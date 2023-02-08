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
          userId: ctx.session.user.id,
          isSessionEnded: false,
        },
      });
    }),
  getSessionWithCollection: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      const today = new Date();

      return ctx.prisma.deckSession.findFirst({
        where: {
          sessionId: input.sessionId,
        },
        include: {
          deckCollection: {
            include: {
              cards: {
                where: {
                  nextReview: {
                    lte: today,
                  },
                },
              },
            },
          },
        },
      });
    }),
  createSession: protectedProcedure
    .input(
      z.object({
        deckCollectionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const today = new Date();
      // fetch all cards with a nextReview date of today
      const cards = await ctx.prisma.card.findMany({
        where: {
          nextReview: {
            equals: today,
          },
        },
      });

      // create the deck session with the sessionCards field populated with the cards fetched above
      return ctx.prisma.deckSession.create({
        data: {
          deckCollectionId: input.deckCollectionId,
          userId: ctx.session.user.id,
          sessionCards: {
            connect: cards.map((card) => ({ id: card.id })),
          },
        },
      });
    }),

  updateSession: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
        masteredCount: z.number(),
        reviewCount: z.number(),
        sessionCard: z.object({
          nextReview: z.date(),
          interval: z.number(),
          id: z.string(),
        }),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.deckSession.update({
        where: {
          sessionId: input.sessionId,
        },
        data: {
          masteredCount: input.masteredCount,
          reviewCount: input.reviewCount,
          sessionCards: {
            connect: {
              id: input.sessionCard.id,
            },
            update: {
              data: {
                nextReview: input.sessionCard.nextReview,
                interval: input.sessionCard.interval,
              },
              where: {
                id: input.sessionCard.id,
              },
            },
          },
        },
      });
    }),
});
