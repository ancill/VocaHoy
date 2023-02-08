import { Card, DeckSession } from "@prisma/client";
import CardFlipper from "./CardFlipper";
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";

export type ButtonActions = "correct" | "repeat";

const CardStack = ({
  cardCollection,
  currentSession,
}: {
  cardCollection: Card[];
  currentSession: DeckSession;
}) => {
  const [flashcards, setFlashcards] = useState<Card[]>(cardCollection);
  const [reviewCount, setReviewCount] = useState(0);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const updateSessionMutation = api.deckSession.updateSession.useMutation();

  useEffect(() => {
    if (flashcards.length === 0) return;

    setCurrentCard(flashcards[0]!);
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

    const mutationDto = {
      masteredCount: isCorrect
        ? currentSession.masteredCount + 1
        : currentSession.masteredCount,
      reviewCount: reviewCount,
      sessionId: currentSession.sessionId,
      sessionCard: {
        nextReview: updatedCard.nextReview,
        interval: updatedCard.interval,
        id: updatedCard.id,
      },
    };

    return { flashCardsCopy, updatedCard, mutationDto };
  };

  const handleRepeatAgain = () => {
    setReviewCount(reviewCount + 1);
    const { flashCardsCopy, updatedCard, mutationDto } =
      getFlashCardsCopyAndUpdatedCard(false);

    const middleIndex = Math.floor(flashcards.length / 2);
    flashCardsCopy.splice(middleIndex, 0, updatedCard!);
    flashCardsCopy.shift();

    setCurrentCard(null);
    setFlashcards(flashCardsCopy);
    updateSessionMutation.mutateAsync(mutationDto);
  };

  const handleCorrect = () => {
    const { flashCardsCopy, mutationDto } =
      getFlashCardsCopyAndUpdatedCard(true);

    flashCardsCopy.shift();
    setCurrentCard(null);
    setFlashcards(flashCardsCopy);
    updateSessionMutation.mutateAsync(mutationDto);
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
