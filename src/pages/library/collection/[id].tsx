import React from "react";
import { api } from "../../../utils/api";
import Loader from "../../../components/Loader";
import { useRouter } from "next/router";
import CollectionTableNoData from "../../../components/Library/CollectionTable/CollectionTableNoData";
import CollectionTable from "../../../components/Library/CollectionTable/CollectionTable";

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
    return <CollectionTableNoData collectionId={collectionId} />;

  return studySessionQuery.isSuccess ? (
    // Session view
    <CollectionTable
      cards={studySessionQuery.data!.studyList}
      collectionId={studySessionQuery.data!.cardsCollectionId}
      headerLabel="Session info"
      collectionLabel={studySessionQuery.data!.cardsCollection.label}
    />
  ) : (
    // Collection view
    <CollectionTable
      cards={data.cards}
      collectionId={collectionId}
      collectionLabel={data.label}
    />
  );
};

export default CollectionPage;
