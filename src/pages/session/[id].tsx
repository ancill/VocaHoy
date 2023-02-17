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
}
const SessionPage = () => {
  const router = useRouter();
  const sessionId = router.query.id as string;
  const { data, isFetching, error } = api.studySession.getBySessionId.useQuery({
    sessionId,
  });
  const [sessionProgress, setSessionProgress] = useState<SessionProgress>({
    masteredCount: 0,
    reviewCount: 0,
    cardsCount: data?.studyList.length || 0,
  });

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
        setSessionProgress={setSessionProgress}
        sessionProgress={sessionProgress}
      />
    </div>
  );
};

export default SessionPage;
