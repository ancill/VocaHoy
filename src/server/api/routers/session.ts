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
  getSessionWithCollection: protectedProcedure
    .input(
      z.object({
        sessionId: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.deckSession.findFirst({
        where: {
          sessionId: input.sessionId,
        },
        include: {
          deckCollection: {
            include: {
              cards: true,
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
        masteredCount: z.number(),
        progressCount: z.number(),
        reviewCount: z.number(),
        newCount: z.number(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.deckSession.update({
        where: {
          sessionId: input.sessionId,
        },
        data: {
          masteredCount: input.masteredCount,
          progressCount: input.progressCount,
          reviewCount: input.reviewCount,
          newCount: input.newCount,
        },
      });
    }),
});
