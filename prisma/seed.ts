import { Card, CardCollectionCategory, CardsCollection } from "@prisma/client";
import { prisma } from "../src/server/db";

const imgUrl = "http://localhost:8080/images/";
const getImgUrl = (i: string) => `${imgUrl}${i}.png`;
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

const mockCollections = (
  img: string,
  length: number,
  category: CardCollectionCategory
) =>
  Array(length)
    .fill(null)
    .map((_, i) => {
      return {
        label: `${category.toUpperCase()} ${i}`,
        category: category,
        description: `Development collection number ${i}`,
        imgUrl: img,
      };
    }) as CardsCollection[];

async function main() {
  // deckCategory seed
  const devCollections = await Promise.all(
    mockCollections("😈", 3, "DEV").map(async (collection) => {
      return await prisma.cardsCollection.create({
        data: collection,
      });
    })
  );

  const persCollections = await Promise.all(
    mockCollections("🔏", 1, "PERSONAL").map(async (collection) => {
      return await prisma.cardsCollection.create({
        data: collection,
      });
    })
  );

  const topCollections = await Promise.all(
    mockCollections("✍️", 1, "TOP_5000").map(async (collection) => {
      return await prisma.cardsCollection.create({
        data: collection,
      });
    })
  );

  const cards = await Promise.all(
    devCollections.map(async (coll) => {
      return await prisma.card.createMany({
        data: mockData(coll.id),
      });
    })
  );
  console.log("Created cards count:", cards.length);
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
