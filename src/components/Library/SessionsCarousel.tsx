import { CardsCollection } from "@prisma/client";
import DeckCollectionCard from "./DeckCollectionCard";
import { api } from "../../utils/api";
import Loader from "../Loader";

const SessionsCarousel = () => {
  const { data, isLoading } = api.studySession.getAllSessionsForUser.useQuery();

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div className="carousel rounded-box space-x-4 p-4">
      {data.map((el) => (
        <div className="carousel-item" key={el.id}>
          <DeckCollectionCard
            {...el.cardsCollection}
            sessionId={el.id}
            count={el._count.studyList - el.masteredCount}
          />
        </div>
      ))}
    </div>
  );
};
export default SessionsCarousel;
