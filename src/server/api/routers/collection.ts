import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CardCollectionCategory } from "@prisma/client";

export const collectionRouter = createTRPCRouter({
  getCardsCollection: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.cardsCollection.findMany({
      include: {
        _count: {
          select: {
            cards: true,
          },
        },
      },
    });
  }),
  getCardCollection: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.cardsCollection.findFirst({
        where: {
          id: input.id,
        },
        include: {
          cards: true,
        },
      });
    }),
  createCollection: protectedProcedure
    .input(
      z.object({
        category: z.nativeEnum(CardCollectionCategory),
        description: z.string(),
        imgUrl: z.string(),
        label: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.cardsCollection.create({
        data: {
          category: input.category,
          description: input.description,
          imgUrl: input.imgUrl,
          label: input.label,
        },
      });
    }),

  removeCollection: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.cardsCollection.delete({
        where: {
          id: input.id,
        },
      });
    }),
});
