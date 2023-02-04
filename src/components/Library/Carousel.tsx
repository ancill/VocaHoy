import { DeckCollection } from "@prisma/client";
import DeckCollectionCard from "./DeckCollectionCard";

const Carousel = ({ collections }: { collections: DeckCollection[] }) => {
  return (
    <div className="mx-4 pb-4">
      <h1 className="py-4 text-4xl font-bold text-primary-content">
        Collections
      </h1>
      <div className="carousel rounded-box space-x-4">
        {collections.map((el) => (
          <div className="carousel-item" key={el.id}>
            <DeckCollectionCard {...el} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Carousel;
