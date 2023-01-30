import { Deck, DeckCollection } from "../../types/Library";
import DeckCollectionCard from "./DeckCollectionCard";

const Carousel = ({ deck }: { deck: Deck }) => {
  return (
    <div className="mx-4 pb-4">
      <h1 className="font-title py-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl">
        {deck.title}
      </h1>
      <div className="carousel rounded-box space-x-4">
        {deck.collection.map((el: DeckCollection) => (
          <div className="carousel-item" key={el.id}>
            <DeckCollectionCard {...el} />
          </div>
        ))}
      </div>
    </div>
  );
};
export default Carousel;
