import { useRouter } from "next/router";
import { NAVIGATION_ROUTES } from "../../constants/navigation";
import { CardsCollection } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "../../utils/api";

const DeckCollectionCard = ({
  category,
  description,
  id,
  imgUrl,
  label,
}: CardsCollection) => {
  const router = useRouter();
  const createSessionMutation = api.studySession.create.useMutation();
  const { data, isFetching, error } =
    api.studySession.getByCollectionId.useQuery({
      cardsCollectionId: id,
      isSessionEnded: false,
    });

  const handleCardClick = async () => {
    let sessionIdForRouter = data?.id;

    // If session is not exist or it's already ended create new one
    if (!sessionIdForRouter) {
      const result = await createSessionMutation.mutateAsync({
        cardsCollectionId: id,
      });

      sessionIdForRouter = result.id;
    }

    // Redirect to dynamic page for each session
    router.push(NAVIGATION_ROUTES.deckSession + `/${sessionIdForRouter}`);
  };

  return (
    <div className="card bg-base-100 shadow-xl lg:card-side">
      <figure>
        <img src={imgUrl} alt="Collection" />
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
