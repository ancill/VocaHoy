import Card from "../components/Session/Card";
import ControlButtons from "../components/Session/ControlButtons";
import ProgressBar from "../components/Session/ProgressBar";
import { api } from "../utils/api";

const SessionPage = ({}) => {
  const { data, error, isLoading } = api.deck.getCardsForCollection.useQuery();

  return (
    <div className="container glass mx-auto mt-4 flex flex-col rounded-lg pb-24">
      <ProgressBar />
      <Card cardCollection={data} />
    </div>
  );
};

export default SessionPage;
