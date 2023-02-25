import { useRouter } from "next/router";
import { NAVIGATION_ROUTES } from "../../constants/navigation";
import { CardsCollection } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "../../utils/api";
import Twemoji from "../Twemoji";

const DeckCollectionCard = ({
  category,
  description,
  id,
  imgUrl,
  label,
  sessionId,
}: CardsCollection & { sessionId?: string }) => {
  const router = useRouter();
  const createSessionMutation = api.studySession.create.useMutation();

  const handleCardClick = async () => {
    let sessionIdForRouter = sessionId;

    // If session is not exist or it's already ended create new one
    if (!sessionId) {
      const result = await createSessionMutation.mutateAsync({
        cardLimitPerSession: 20,
        cardsCollectionId: id,
      });

      sessionIdForRouter = result!.id;
    }

    // Redirect to dynamic page for each session
    router.push(NAVIGATION_ROUTES.deckSession + `/${sessionIdForRouter}`);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure className="px-10 pt-10">
        <Twemoji emoji={imgUrl} />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{label}</h2>
        <p>{description}</p>
        <div className="card-actions">
          <button className="btn-primary btn" onClick={handleCardClick}>
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeckCollectionCard;
