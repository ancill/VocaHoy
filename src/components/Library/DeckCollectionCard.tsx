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
    <div className="card bg-base-100 shadow-xl lg:card-side">
      <figure>
        d s<Twemoji emoji="👋" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{label}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button className="btn-primary btn" onClick={handleCardClick}>
            Learn
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeckCollectionCard;
