import { Card } from "@prisma/client";
import CardFlipper from "./CardFlipper";
import { useEffect, useState } from "react";
import { api } from "../../../utils/api";
import Loader from "../../Loader";

export type ButtonActions = "correct" | "repeat";

const ShadowCards = ({}) => {
  return (
    <>
      {new Array(3).fill(null).map((_, i) => (
        <div key={i} className="card w-96 bg-base-100 text-center shadow-xl">
          <div className="card-body h-80"></div>
          <div className="card-body h-80"></div>
        </div>
      ))}
    </>
  );
};

const CardStack = ({
  studyList,
  sessionId,
}: {
  studyList: Card[];
  sessionId: string;
}) => {
  const [flashcards, setFlashcards] = useState(studyList);
  const [reviewCount, setReviewCount] = useState(0);
  const [currentCard, setCurrentCard] = useState(studyList[0]);

  const closeSessionMutation = api.studySession.closeSession.useMutation();

  useEffect(() => {
    if (flashcards?.length === 0) {
      // closeSessionMutation.mutate({
      //   sessionId: sessionId,
      // });
      return;
    }

    setCurrentCard(flashcards[0]);
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

    const mutationDto: {
      sessionId: string;
      interval: number;
      nextReview: Date;
      isSessionEnded: boolean;
    } = {
      sessionId: sessionId,
      nextReview: updatedCard.nextReview,
      interval: updatedCard.interval,
      isSessionEnded: false,
    };

    return { flashCardsCopy, updatedCard, mutationDto };
  };

  const handleRepeatAgain = () => {
    setReviewCount(reviewCount + 1);
    const { flashCardsCopy, updatedCard, mutationDto } =
      getFlashCardsCopyAndUpdatedCard(false);

    const middleIndex = Math.floor(flashcards.length / 2);
    flashCardsCopy.splice(middleIndex, 0, updatedCard);
    flashCardsCopy.shift();

    setFlashcards(flashCardsCopy);
    //updateSessionMutation.mutateAsync(mutationDto);
  };

  const handleCorrect = () => {
    const { flashCardsCopy, mutationDto } =
      getFlashCardsCopyAndUpdatedCard(true);

    flashCardsCopy.shift();
    setFlashcards(flashCardsCopy);
    // updateSessionMutation.mutateAsync(mutationDto);
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
        <div>
          <CardFlipper cardInfo={currentCard} onActionClicked={handleActions} />
        </div>
        <ShadowCards />
      </div>
    </div>
  );
};

export default CardStack;
