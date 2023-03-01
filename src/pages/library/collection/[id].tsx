import React from "react";
import CollectionTableBar from "../../../components/Library/CollectionTable/CollectionTableBar";
import CollectionTableHead from "../../../components/Library/CollectionTable/CollectionTableHead";
import CollectionTableContent from "../../../components/Library/CollectionTable/CollectionTableContent";
import { api } from "../../../utils/api";
import Loader from "../../../components/Loader";
import Twemoji from "../../../components/Twemoji";
import { useRouter } from "next/router";

const CollectionPage = () => {
  const { query, isReady } = useRouter();
  const collectionId = query.id as string;
  const { data, isLoading, refetch } =
    api.cardsCollection.getCardCollection.useQuery(
      {
        id: collectionId,
      },
      { enabled: isReady }
    );

  if (!isReady || isLoading) return <Loader />;
  if (!data || data?.cards?.length === 0)
    return (
      <>
        <CollectionTableBar label="Return" collectionId={collectionId} />
        <div className="card bg-base-100">
          <div className="card-body items-center  justify-center text-2xl font-bold">
            <Twemoji emoji="🙈" />
            <span> No data</span>
          </div>
        </div>
      </>
    );

  return (
    <>
      <CollectionTableBar label={data.label} collectionId={collectionId} />
      <div className="w-full overflow-x-auto ">
        <table className="table w-full ">
          <CollectionTableHead />
          <CollectionTableContent
            cards={data.cards}
            collectionLabel={data.label}
          />
        </table>
      </div>
    </>
  );
};

export default CollectionPage;
