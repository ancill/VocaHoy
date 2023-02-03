import { useRouter } from "next/router";
import { NAVIGATION_ROUTES } from "../../constants/navigation";
import { DeckCollection } from "@prisma/client";

const DeckCollectionCard = ({
  category,
  description,
  id,
  imgUrl,
  label,
}: DeckCollection) => {
  const router = useRouter();

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
          <button
            className="btn-primary btn"
            onClick={() => router.push(NAVIGATION_ROUTES.deckSession)}
          >
            CLICK ME
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeckCollectionCard;
