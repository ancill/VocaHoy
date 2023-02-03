import { useRouter } from "next/router";
import { DeckCollection } from "../../types/Library";
import { NAVIGATION_ROUTES } from "../../constants/navigation";

const DeckCollectionCard = ({
  title,
  description,
  buttonInfo,
  image,
}: DeckCollection) => {
  const router = useRouter();

  return (
    <div className="card-compact card w-64 bg-base-100 text-white shadow-xl">
      <figure>
        <img
          src={image}
          alt="car!"
          className="bg-gradient-to-r from-primary to-accent"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{title}</h2>
        <p>{description}</p>
        <div className="card-actions justify-end">
          <button
            className="btn-primary btn"
            onClick={() => router.push(NAVIGATION_ROUTES.deckSession)}
          >
            {buttonInfo}
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeckCollectionCard;
