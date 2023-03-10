import { Card } from "@prisma/client";
import CardFlipper from "./CardFlipper";
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import { BlankCard, ShadowCards } from "./ShadowCards";
import { SessionProgress } from "../../../pages/session/[id]";

export type ButtonActions = "correct" | "repeat";

// Updated card with Space Repetition algorithm
const getUpdatedCardWithSRA = (currentCard: Card, isCorrect: boolean) => {
  const interval = isCorrect ? currentCard.interval * 2 : 1;
  const nextReview = new Date(
    new Date().getTime() + interval * 24 * 60 * 60 * 1000
  );
  const updatedCard = {
    ...currentCard,
    interval: interval,
    nextReview: isCorrect ? nextReview : currentCard.nextReview,
  };

  return updatedCard;
};

const CardStack = ({
  studyList,
  sessionId,
  sessionState: { sessionProgress, setSessionProgress },
}: {
  studyList: Card[];
  sessionId: string;
  sessionState: {
    sessionProgress: SessionProgress;
    setSessionProgress: (sessionProgress: SessionProgress) => void;
  };
}) => {
  const [flashcards, setFlashcards] = useState(studyList);
  const [currentCard, setCurrentCard] = useState(studyList[0]);

  useEffect(() => {
    if (flashcards?.length === 0) {
      return;
    }

    setCurrentCard(flashcards[0]);
  }, [flashcards]);

  const handleActions = (action: ButtonActions) => {
    const updatedCard = getUpdatedCardWithSRA(
      currentCard!,
      action === "correct"
    );
    const flashCardsCopy = [...flashcards];
    const sessionCardUpdateData = {
      cardId: updatedCard.id,
      interval: updatedCard.interval,
      nextReview: updatedCard.nextReview,
      sessionId: sessionId,
    };

    if (action === "correct") {
      setSessionProgress({
        masteredCount: sessionProgress.masteredCount + 1,
        reviewCount: sessionProgress.reviewCount,
        cardsCount: sessionProgress.cardsCount,
        ...sessionCardUpdateData,
      });
      flashCardsCopy.shift();
    }
    if (action === "repeat") {
      setSessionProgress({
        masteredCount: sessionProgress.masteredCount,
        reviewCount: sessionProgress.reviewCount + 1,
        cardsCount: sessionProgress.cardsCount,
        ...sessionCardUpdateData,
      });
      const middleIndex = Math.floor(flashcards.length / 2);
      flashCardsCopy.splice(middleIndex, 0, updatedCard);
      flashCardsCopy.shift();
    }

    setFlashcards(flashCardsCopy);
  };

  return currentCard ? (
    <div className="mt-5 flex flex-col items-center">
      <div className="stack">
        <div>
          <CardFlipper cardInfo={currentCard} onActionClicked={handleActions} />
        </div>
        <ShadowCards />
      </div>
    </div>
  ) : (
    <BlankCard />
  );
};

export default CardStack;
