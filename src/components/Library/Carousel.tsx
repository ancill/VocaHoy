import { DeckCollection } from "@prisma/client";
import DeckCollectionCard from "./DeckCollectionCard";

const Carousel = ({ collections }: { collections: DeckCollection[] }) => {
  return (
    <div className="carousel rounded-box space-x-4">
      {collections.map((el) => (
        <div className="carousel-item" key={el.id}>
          <DeckCollectionCard {...el} />
        </div>
      ))}
    </div>
  );
};
export default Carousel;
