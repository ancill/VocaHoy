import { useRouter } from "next/router";
import CardStack from "../../components/Session/Card/CardStack";
import ProgressBar from "../../components/Session/ProgressBar";
import { api } from "../../utils/api";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const SessionPage = () => {
  const router = useRouter();

  const { data, error, isLoading } =
    api.deckSession.getSessionWithCollection.useQuery({
      sessionId: (router.query.id as string) || "", // query.id on first render undefined
    });

  if (isLoading || !data) return <Loader />;
  return (
    <div className="container mx-auto flex flex-col rounded-lg bg-base-200 pb-24">
      <ProgressBar sessionInfo={data} deckLabel={data.deckCollection.label} />
      <CardStack
        cardCollection={data.deckCollection.cards}
        currentSession={data}
      />
    </div>
  );
};

export default SessionPage;
