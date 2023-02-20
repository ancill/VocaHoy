import { useRouter } from "next/router";
import CardStack from "../../components/Session/Card/CardStack";
import ProgressBar from "../../components/Session/ProgressBar";
import { api } from "../../utils/api";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";

export interface SessionProgress {
  masteredCount: number;
  reviewCount: number;
  cardsCount: number;
  interval: number;
  nextReview: Date;
  sessionId: string;
  cardId: string;
}

const sessionProgressInitState: SessionProgress = {
  masteredCount: 0,
  reviewCount: 0,
  cardsCount: 0,
  cardId: "",
  interval: 1,
  nextReview: new Date(),
  sessionId: "",
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
  const updateSessionCard = api.studySession.updateStudySession.useMutation();

  useEffect(() => {
    setSessionProgress({
      ...sessionProgress,
      masteredCount: data?.masteredCount || 0,
      reviewCount: data?.reviewCount || 0,
      cardsCount: data?.studyList.length || 0,
    });
  }, [data?.studyList.length]);
  const handleSessionUpdate = (sessionData: SessionProgress) => {
    setSessionProgress(sessionData);
    updateSessionCard.mutate(sessionData);
  };

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
        sessionState={{
          sessionProgress,
          setSessionProgress: handleSessionUpdate,
        }}
      />
    </div>
  );
};

export default SessionPage;
