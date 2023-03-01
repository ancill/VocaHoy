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
}: CardsCollection & { sessionId: string }) => {
  const router = useRouter();
  const createSessionMutation = api.studySession.create.useMutation();
  const removeCollectionMutation =
    api.cardsCollection.removeCollection.useMutation();
  const { refetch } = api.studySession.getBySessionId.useQuery(
    {
      sessionId,
    },
    {
      enabled: false,
    }
  );
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

  const handleCheckCollection = () => {
    // Redirect to dynamic page for collection
    router.push(NAVIGATION_ROUTES.collection + `/${id}`);
  };

  return (
    <div className="card w-96 bg-base-100 p-4 shadow-xl">
      <div className="card-actions justify-end">
        <button
          className="btn-square btn-sm btn"
          onClick={() =>
            removeCollectionMutation.mutate(
              {
                id: id,
              },
              {
                onSuccess: () => refetch(),
              }
            )
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
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
          <button className="btn-secondary btn" onClick={handleCheckCollection}>
            Show
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeckCollectionCard;
