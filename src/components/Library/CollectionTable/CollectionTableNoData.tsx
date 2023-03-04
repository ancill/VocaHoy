import React from "react";
import CollectionTableBar from "./CollectionTableBar";
import Twemoji from "../../Twemoji";

const CollectionTableNoData = ({ collectionId }: { collectionId: string }) => {
  return (
    <>
      <CollectionTableBar label="Return" collectionId={collectionId} />
      <div className="card bg-base-100">
        <div className="card-body items-center justify-center text-2xl font-bold">
          <Twemoji emoji="🙈" />
          <span> No data</span>
        </div>
      </div>
    </>
  );
};
export default CollectionTableNoData;
