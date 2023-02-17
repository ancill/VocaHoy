import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  getUsersByRating: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.groupBy({
      by: ["name", "image"],
      _count: {
        _all: true,
      },
    });
  }),
});
