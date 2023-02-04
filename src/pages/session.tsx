import CardStack from "../components/Session/Card";
import ProgressBar from "../components/Session/ProgressBar";
import { api } from "../utils/api";

const SessionPage = ({}) => {
  const { data, error, isLoading } = api.deck.getCardsForCollection.useQuery();

  if (isLoading || !data) return <div>Loading</div>;
  return (
    <div className="container glass mx-auto mt-4 flex flex-col rounded-lg pb-24">
      <ProgressBar />
      <CardStack cardCollection={data} />
    </div>
  );
};

export default SessionPage;
