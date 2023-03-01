import React from "react";
import DeckCollectionCard from "./DeckCollectionCard";
import { CardsCollection } from "@prisma/client";
import { useAutoAnimate } from "@formkit/auto-animate/react";
const CardCollectionGrid = ({
  collections,
}: {
  collections: CardsCollection[];
}) => {
  const [parent] = useAutoAnimate();
  return (
    <div
      className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4"
      ref={parent}
    >
      {collections.map((el) => (
        <DeckCollectionCard {...el} key={el.id} />
      ))}
    </div>
  );
};

export default CardCollectionGrid;
