import React from "react";
import CollectionTableBar from "../../../components/Library/CollectionTable/CollectionTableBar";
import CollectionTableHead from "../../../components/Library/CollectionTable/CollectionTableHead";
import CollectionTableContent from "../../../components/Library/CollectionTable/CollectionTableContent";
import { api } from "../../../utils/api";
import Loader from "../../../components/Loader";
import Twemoji from "../../../components/Twemoji";
import { useRouter } from "next/router";
import { Card } from "@prisma/client";

const NoDataCollection = ({ collectionId }: { collectionId: string }) => {
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

const CollectionTable = ({
  label,
  collectionId,
  cards,
}: {
  label: string;
  collectionId: string;
  cards: Card[];
}) => {
  return (
    <>
      <CollectionTableBar label={label} collectionId={collectionId} />
      <div className="w-full overflow-x-auto ">
        <table className="table w-full ">
          <CollectionTableHead />
          <CollectionTableContent cards={cards} collectionLabel={label} />
        </table>
      </div>
    </>
  );
};

const CollectionPage = () => {
  const { query, isReady } = useRouter();
  const collectionId = query.id as string;

  const { data, isLoading } = api.cardsCollection.getCardCollection.useQuery(
    {
      id: collectionId,
    },
    { enabled: isReady }
  );

  const studySessionQuery = api.studySession.getBySessionId.useQuery(
    {
      sessionId: query.sessionId as string,
    },
    {
      enabled: query.sessionId !== undefined && query.sessionId !== "undefined",
    }
  );

  if (!isReady || isLoading) return <Loader />;
  if (!data || data?.cards?.length === 0)
    return <NoDataCollection collectionId={collectionId} />;

  return studySessionQuery.isSuccess ? (
    // Session view
    <CollectionTable
      cards={studySessionQuery.data!.studyList}
      collectionId={studySessionQuery.data!.cardsCollectionId}
      label="Session info"
    />
  ) : (
    // Collection view
    <CollectionTable
      cards={data.cards}
      collectionId={collectionId}
      label={data.label}
    />
  );
};

export default CollectionPage;
