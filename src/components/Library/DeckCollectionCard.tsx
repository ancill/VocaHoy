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

  const handleCardClick = async () => {
    const result = await createSessionMutation.mutateAsync({
      deckCollectionId: id,
    });
    router.push({ href: NAVIGATION_ROUTES.deckSession, query: result.id });
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
