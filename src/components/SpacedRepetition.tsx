import React, { useState, useEffect } from "react";

interface Flashcard {
  question: string;
  answer: string;
  interval: number;
  nextReview: Date;
}

const flashcardsCollection: Flashcard[] = [
  {
    question: "What is TypeScript?",
    answer:
      "TypeScript is a statically typed language that compiles to JavaScript.",
    interval: 1,
    nextReview: new Date(),
  },
  {
    question: "What is JavaScript?",
    answer: "JavaScript is a high-level, interpreted programming language.",
    interval: 2,
    nextReview: new Date(),
  },
  {
    question: "What is React?",
    answer: "React is a JavaScript library for building user interfaces.",
    interval: 1,
    nextReview: new Date(),
  },
  {
    question: "What is Node.js?",
    answer:
      "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    interval: 1,
    nextReview: new Date(),
  },
  {
    question: "What is Express.js?",
    answer:
      "Express.js is a fast, unopinionated, minimalist web framework for Node.js.",
    interval: 1,
    nextReview: new Date(),
  },
  {
    question: "What is GraphQL?",
    answer:
      "GraphQL is a query language for APIs and a runtime for executing those queries against your data.",
    interval: 1,
    nextReview: new Date(),
  },
  {
    question: "What is Prisma?",
    answer:
      "Prisma is a modern database toolkit that makes it easy to work with databases in your backends.",
    interval: 1,
    nextReview: new Date(),
  },
];

const SpacedRepetition: React.FC = () => {
  const [flashcards, setFlashcards] =
    useState<Flashcard[]>(flashcardsCollection);

  const [currentCard, setCurrentCard] = useState<Flashcard | null>(null);
  const [correctFlashCards, setCorrectFlashCards] = useState<Flashcard[]>([]);

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

  if (!currentCard) return <p>No cards to review</p>;

  return (
    <div className="flex h-screen flex-col items-center">
      <h2 className="mb-6 text-3xl font-bold">{currentCard.question}</h2>
      <p className="text-1xl mb-6 font-bold">{currentCard.answer}</p>
      <button className="btn-primary btn" onClick={handleCorrect}>
        Correct
      </button>
      <button className="btn-accent btn" onClick={handleRepeatAgain}>
        Repeat Again
      </button>
    </div>
  );
};

export default SpacedRepetition;
