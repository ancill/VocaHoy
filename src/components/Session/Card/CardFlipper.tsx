import { Card, PersonalCardReviewProgress } from "@prisma/client";
import { useState, SyntheticEvent } from "react";
import ReactCardFlip from "react-card-flip";
import { ButtonActions } from "./CardStack";

const BackCardButtons = ({
  onClickAction,
}: {
  onClickAction: (action: ButtonActions) => void;
}) => {
  const handleClick = (e: SyntheticEvent, action: ButtonActions) => {
    e.stopPropagation();
    onClickAction(action);
  };

  return (
    <div className="card-actions">
      <button className="btn-neutral btn">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
          />
        </svg>
      </button>
      <button
        className="btn-accent btn"
        onClick={(e) => handleClick(e, "repeat")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M7.5 15h2.25m8.024-9.75c.011.05.028.1.052.148.591 1.2.924 2.55.924 3.977a8.96 8.96 0 01-.999 4.125m.023-8.25c-.076-.365.183-.75.575-.75h.908c.889 0 1.713.518 1.972 1.368.339 1.11.521 2.287.521 3.507 0 1.553-.295 3.036-.831 4.398C20.613 14.547 19.833 15 19 15h-1.053c-.472 0-.745-.556-.5-.96a8.95 8.95 0 00.303-.54m.023-8.25H16.48a4.5 4.5 0 01-1.423-.23l-3.114-1.04a4.5 4.5 0 00-1.423-.23H6.504c-.618 0-1.217.247-1.605.729A11.95 11.95 0 002.25 12c0 .434.023.863.068 1.285C2.427 14.306 3.346 15 4.372 15h3.126c.618 0 .991.724.725 1.282A7.471 7.471 0 007.5 19.5a2.25 2.25 0 002.25 2.25.75.75 0 00.75-.75v-.633c0-.573.11-1.14.322-1.672.304-.76.93-1.33 1.653-1.715a9.04 9.04 0 002.86-2.4c.498-.634 1.226-1.08 2.032-1.08h.384"
          />
        </svg>
      </button>
      <button
        className="btn-success btn hover:border-green-600 hover:bg-green-600"
        onClick={(e) => handleClick(e, "correct")}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
          />
        </svg>
      </button>
    </div>
  );
};

const FrontCardButtons = () => (
  <div className="card-actions">
    <button className="btn-outline btn" name="card">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>{" "}
    </button>
  </div>
);

const CardFlipper = ({
  cardInfo: { imgUrl, audioUrl, back, front },
  onActionClicked,
}: {
  cardInfo: Card;
  onActionClicked: (action: ButtonActions) => void;
}) => {
  const [isFlipped, setFlip] = useState(false);

  const flipCard = (e: SyntheticEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFlip(!isFlipped);
  };

  const renderImg = () => (
    <img src={imgUrl} alt={front} className="rounded-xl" />
  );

  const renderLabel = (label: string, isQuestion: boolean = false) => {
    return (
      <h2
        className={`min-h-16 card-title mb-4 ${
          isQuestion ? "text-4xl" : "text-2xl"
        }`}
      >
        {label}
      </h2>
    );
  };
  return (
    <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
      <div
        className="card w-96 bg-base-100 text-center shadow-xl"
        onClick={flipCard}
      >
        <figure className="relative px-10 pt-10">{renderImg()}</figure>
        <div className="card-body items-center text-center">
          {renderLabel(front, true)}
          <FrontCardButtons />
        </div>
      </div>

      <div
        className="card w-96 bg-base-100 text-center shadow-xl"
        onClick={flipCard}
      >
        <figure className="relative px-10 pt-10">
          {renderImg()}
          <h2 className="absolute bottom-4 text-5xl font-bold text-base-200 backdrop-blur-sm">
            {front}
          </h2>
        </figure>
        <div className="card-body items-center text-center">
          {renderLabel(back)}
          <BackCardButtons onClickAction={onActionClicked} />
        </div>
      </div>
    </ReactCardFlip>
  );
};

export default CardFlipper;
