import { Card } from "@prisma/client";
import CardFlipper from "./CardFlipper";
import { useEffect, useState } from "react";

export type ButtonActions = "correct" | "repeat";

const CardStack = ({ cardCollection }: { cardCollection: Card[] }) => {
  const [flashcards, setFlashcards] = useState<Card[]>(cardCollection);

  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [correctFlashCards, setCorrectFlashCards] = useState<Card[]>([]);

  useEffect(() => {
    if (flashcards.length === 0) return;

    setCurrentCard(flashcards[0]!);
    console.log(flashcards);
  }, [flashcards]);

  const getFlashCardsCopyAndUpdatedCard = (isCorrect: boolean) => {
    const flashCardsCopy = [...flashcards];
    const updatedCard = {
      ...currentCard!,
      interval: isCorrect ? currentCard!.interval * 2 : 1,
      nextReview: new Date(
        new Date().getTime() + currentCard!.interval * 24 * 60 * 60 * 1000
      ),
    };
    return { flashCardsCopy, updatedCard };
  };

  const handleRepeatAgain = () => {
    const { flashCardsCopy, updatedCard } =
      getFlashCardsCopyAndUpdatedCard(false);

    const middleIndex = Math.floor(flashcards.length / 2);
    flashCardsCopy.splice(middleIndex, 0, updatedCard!);
    flashCardsCopy.shift();

    setCurrentCard(null);
    setFlashcards(flashCardsCopy);
  };

  const handleCorrect = () => {
    const { flashCardsCopy, updatedCard } =
      getFlashCardsCopyAndUpdatedCard(true);

    setCorrectFlashCards([...correctFlashCards, updatedCard]);
    flashCardsCopy.shift();
    setCurrentCard(null);
    setFlashcards(flashCardsCopy);
  };

  const handleActions = (action: ButtonActions) => {
    action === "correct" && handleCorrect();
    action === "repeat" && handleRepeatAgain();
  };

  if (!currentCard)
    return (
      <div className="mt-5 flex flex-col items-center">
        <div className="card w-96 bg-base-100 text-center shadow-xl">
          <div className="card-body items-center text-center">
            NO CARDS FOR REVIEW
          </div>
        </div>
      </div>
    );

  return (
    <div className="mt-5 flex flex-col items-center">
      <div className="stack">
        {flashcards.map((card) => (
          <div key={card.id}>
            <CardFlipper cardInfo={card} onActionClicked={handleActions} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardStack;
