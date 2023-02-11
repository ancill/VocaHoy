import { Card } from "@prisma/client";
import { prisma } from "../src/server/db";

const mockData = (collectionId: string) =>
  Array(200)
    .fill(null)
    .map((_, i) => {
      return {
        front: `question ${i}`,
        back: `answer ${i}`,
        imgUrl:
          "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
        cardsCollectionId: collectionId,
        audioUrl: "",
      };
    }) as Card[];

async function main() {
  // deckCategory seed
  const collection = await prisma.cardsCollection.create({
    data: {
      label: "Dev",
      category: "DEV",
      description: "Development collection",
      imgUrl:
        "https://daisyui.com/images/stock/photo-1601004890684-d8cbf643f5f2.jpg",
    },
  });

  const cards = await prisma.card.createMany({
    data: mockData(collection.id),
  });

  console.log("Created cards count:", cards.count);
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
