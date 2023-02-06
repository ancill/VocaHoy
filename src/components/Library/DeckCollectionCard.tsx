import { useRouter } from "next/router";
import { NAVIGATION_ROUTES } from "../../constants/navigation";
import { DeckCollection } from "@prisma/client";
import { useSession } from "next-auth/react";
import { api } from "../../utils/api";

const DeckCollectionCard = ({
  category,
  description,
  id,
  imgUrl,
  label,
}: DeckCollection) => {
  const router = useRouter();
  const createSessionMutation = api.deckSession.createSession.useMutation();
  const { data, isFetching, error } = api.deckSession.getSession.useQuery({
    deckCollectionId: id,
  });

  const handleCardClick = async () => {
    let sessionIdForRouter = data?.sessionId;
    let isEnded = false; // TODO: Add check for ended session

    // If session is not exist or it's already ended create new one
    if (!sessionIdForRouter || isEnded) {
      const result = await createSessionMutation.mutateAsync({
        deckCollectionId: id,
      });

      sessionIdForRouter = result.sessionId;
    }

    // Redirect to dynamic page for each session
    router.push(NAVIGATION_ROUTES.deckSession + `/${sessionIdForRouter}`);
  };

  return (
    <div className="card-compact card w-64 bg-base-100 text-white shadow-xl">
      <figure>
        <img
          src={imgUrl}
          alt="car!"
          className="bg-gradient-to-r from-primary to-accent"
        />
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
