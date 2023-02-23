import React from "react";
import DeckCollectionCard from "./DeckCollectionCard";
import { CardsCollection } from "@prisma/client";

const CardCollectionGrid = ({
  collections,
}: {
  collections: CardsCollection[];
}) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {collections.map((el) => (
        <div className="carousel-item" key={el.id}>
          <DeckCollectionCard {...el} />
        </div>
      ))}
    </div>
  );
};

export default CardCollectionGrid;
