import { useRouter } from "next/router";
import { NAVIGATION_ROUTES } from "../../constants/navigation";
import { CardsCollection } from "@prisma/client";
import { api } from "../../utils/api";
import Twemoji from "../Twemoji";

const DeckCollectionCard = ({
  category,
  description,
  id,
  imgUrl,
  label,
  sessionId,
  count,
}: CardsCollection & { sessionId?: string; count: number }) => {
  const router = useRouter();
  const createSessionMutation = api.studySession.create.useMutation();
  const closeSessionMutation = api.studySession.closeSession.useMutation();
  const removeCollectionMutation =
    api.cardsCollection.removeCollection.useMutation();
  const { refetch } = api.cardsCollection.getCardsCollection.useQuery(
    undefined,
    {
      enabled: false,
    }
  );
  const handleCloseClick = async () => {
    // remove collection
    !sessionId
      ? removeCollectionMutation.mutateAsync(
          {
            id: id,
          },
          {
            onSuccess: () => refetch(),
          }
        )
      : // close session
        closeSessionMutation.mutateAsync({
          sessionId: sessionId,
        });
  };
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
    // if sessionId provided it means that is current session to show and not a general collection
    router.push(NAVIGATION_ROUTES.collection + `/${id}?sessionId=${sessionId}`);
  };

  const LearnButton = () => {
    if (count === 0) return null;

    return (
      <button className="btn gap-2" onClick={handleCardClick}>
        {!sessionId ? "Start learning" : "Learn"}
        {sessionId && <div className="badge-secondary badge">{count}</div>}
      </button>
    );
  };

  return (
    <div className="card w-96 bg-base-100 p-4 shadow-xl">
      <div className="card-actions justify-end">
        {category === "PERSONAL" || !!sessionId ? (
          <button
            className="btn-square btn-sm btn"
            title="remove"
            onClick={handleCloseClick}
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
        ) : null}
      </div>
      <figure className="px-10 pt-10">
        <Twemoji emoji={imgUrl} />
      </figure>
      <div className="card-body items-center text-center">
        <h2 className="card-title">{label}</h2>
        {!sessionId && <div className="badge badge-lg">{count} cards</div>}
        <p>{description}</p>
        <div className="card-actions">
          <button className="btn" onClick={handleCheckCollection}>
            Show
          </button>
          <LearnButton />
        </div>
      </div>
    </div>
  );
};
export default DeckCollectionCard;
