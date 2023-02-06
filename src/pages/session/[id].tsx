import { useRouter } from "next/router";
import CardStack from "../../components/Session/Card/CardStack";
import ProgressBar from "../../components/Session/ProgressBar";
import { api } from "../../utils/api";
import { useEffect } from "react";

const SessionPage = () => {
  const router = useRouter();

  const { data, error, isLoading } =
    api.deckSession.getSessionWithCollection.useQuery({
      sessionId: (router.query.id as string) || "", // query.id on first render undefined
    });

  if (isLoading || !data) return <div>Loading</div>;
  return (
    <div className="container glass mx-auto mt-4 flex flex-col rounded-lg pb-24">
      <ProgressBar sessionInfo={data} deckLabel={data.deckCollection.label} />
      <CardStack cardCollection={data.deckCollection.cards} />
    </div>
  );
};

export default SessionPage;
