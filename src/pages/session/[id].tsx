import { useRouter } from "next/router";
import CardStack from "../../components/Session/Card/CardStack";
import ProgressBar from "../../components/Session/ProgressBar";
import { api } from "../../utils/api";
import { useEffect } from "react";
import Loader from "../../components/Loader";

const SessionPage = () => {
  const router = useRouter();
  const sessionId = router.query.id as string;
  return (
    <div className="container mx-auto flex flex-col rounded-lg bg-base-200 pb-24">
      <ProgressBar sessionId={sessionId} />
      {/* <CardStack sessionId={sessionId} /> */}
    </div>
  );
};

export default SessionPage;
