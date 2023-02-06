import { Card } from "@prisma/client";
import CardFlipper from "./CardFlipper";

const CardStack = ({ cardCollection }: { cardCollection: Card[] }) => {
  return (
    <div className="mt-5 flex flex-col items-center">
      <div className="stack">
        {cardCollection.map((card) => (
          <div key={card.id}>
            <CardFlipper cardInfo={card} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardStack;
