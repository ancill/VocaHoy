import { useRouter } from "next/router";
import CardStack from "../../components/Session/Card/CardStack";
import ProgressBar from "../../components/Session/ProgressBar";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

export interface SessionProgress {
  sessionCounters: {
    masteredCount: number;
    reviewCount: number;
    cardsCount: number;
  };
  cardInfo: {
    interval: number;
    nextReview: Date;
    sessionId: string;
    cardId: string;
  };
}

const sessionProgressInitState: SessionProgress = {
  sessionCounters: {
    masteredCount: 0,
    reviewCount: 0,
    cardsCount: 0,
  },
  cardInfo: {
    cardId: "",
    interval: 1,
    nextReview: new Date(),
    sessionId: "",
  },
};
const SessionPage = () => {
  const router = useRouter();
  const sessionId = router.query.id as string;
  const { data, isFetching, error } = api.studySession.getBySessionId.useQuery({
    sessionId,
  });
  const [sessionProgress, setSessionProgress] = useState<SessionProgress>(
    sessionProgressInitState
  );
  const updateSessionCard = api.studySession.updateSessionCard.useMutation();

  useEffect(() => {
    setSessionProgress({
      ...sessionProgress,
      sessionCounters: {
        ...sessionProgress.sessionCounters,
        cardsCount: data?.studyList.length || 0,
      },
    });
    updateSessionCard.mutate();
  }, [data]);

  if (!data?.studyList || isFetching) {
    return <Loader />;
  }

  return (
    <div className="container mx-auto flex flex-col rounded-lg bg-base-200 pb-20">
      <ProgressBar
        barInfo={{
          deckLabel: data.cardsCollection.label,
          ...sessionProgress,
        }}
      />
      <CardStack
        studyList={data.studyList}
        sessionId={sessionId}
        sessionState={{ sessionProgress, setSessionProgress }}
      />
    </div>
  );
};

export default SessionPage;
