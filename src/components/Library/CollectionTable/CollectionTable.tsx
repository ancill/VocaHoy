import { Card } from "@prisma/client";
import React from "react";
import CollectionTableBar from "./CollectionTableBar";
import CollectionTableContent from "./CollectionTableContent";
import CollectionTableHead from "./CollectionTableHead";

const CollectionTable = ({
  collectionLabel,
  collectionId,
  cards,
  headerLabel,
}: {
  collectionLabel: string;
  collectionId: string;
  cards: Card[];
  headerLabel?: string;
}) => {
  return (
    <>
      <CollectionTableBar
        label={headerLabel ? headerLabel : collectionLabel}
        collectionId={collectionId}
      />
      <div className="w-full overflow-x-auto ">
        <table className="table w-full ">
          <CollectionTableHead />
          <CollectionTableContent
            cards={cards}
            collectionLabel={collectionLabel}
          />
        </table>
      </div>
    </>
  );
};

export default CollectionTable;
