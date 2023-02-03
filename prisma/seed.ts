import { DeckCategory } from "@prisma/client";
import { prisma } from "../src/server/db";

async function main() {
  // deckCategory seed
  const collection = await prisma.deckCollection.create({
    data: {
      label: "Dev",
      category: DeckCategory.PERSONAL,
      description: "Development collection",
    },
  });

  await prisma.card.createMany({
    data: [
      {
        front: "reunir (v)",
        back: "to put togerther, to get together [also juntar]",
        imgUrl:
          "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
        deckCollectionId: collection.id,
        audioUrl: "",
      },
      {
        front: "nadie (pron)",
        back: "nobody, anybody",
        imgUrl:
          "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
        deckCollectionId: collection.id,
        audioUrl: "",
      },
      {
        front: "asunto",
        back: "matter, issue, affair",
        imgUrl:
          "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
        deckCollectionId: collection.id,
        audioUrl: "",
      },
      {
        front: "which",
        back: "cuál",
        imgUrl:
          "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
        deckCollectionId: collection.id,
        audioUrl: "",
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
