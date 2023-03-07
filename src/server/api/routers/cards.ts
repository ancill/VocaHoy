import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getToday } from "../../../utils/api";

export const cardsRouter = createTRPCRouter({
  createCard: protectedProcedure
    .input(
      z.object({
        front: z.string(),
        back: z.string(),
        audioUrl: z.string(),
        imgUrl: z.string(),
        cardsCollectionId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.card.create({
        data: {
          ...input,
          nextReview: getToday(),
        },
      });
    }),
});
