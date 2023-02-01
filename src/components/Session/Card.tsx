import ReactCardFlip from "react-card-flip";
import ControlButtons from "./ControlButtons";
import { useState } from "react";

const Badges = () => (
  <div className="card-actions justify-end">
    <div className="badge-outline badge">Food</div>
    <div className="badge-outline badge">Top 5000</div>
  </div>
);
const Back = ({ back }) => (
  <>
    <h2 className="card-title">
      <div className="badge-secondary badge">NEW</div>
    </h2>
    <p>{back}</p>
  </>
);

const Front = ({ front }) => (
  <div className="">
    <h1 className="card-title text-3xl font-bold">{front}</h1>
  </div>
);

const CardBody = ({
  front,
  back,
  audioUrl,
  imgUrl,
  id,
  setFlip,
  isFront = false,
}) => {
  return (
    <div className="card w-96 bg-primary shadow-xl">
      <figure>
        <img src={imgUrl} alt="Shoes" onClick={setFlip} />
      </figure>
      <div className="card-body">
        {isFront ? (
          <Front front={front} />
        ) : (
          <>
            <Back back={back} />
            <Badges />
          </>
        )}
      </div>
    </div>
  );
};
const sessionCards = [
  {
    front: "Helado",
    back: "Ice-Cream",
    audioUrl: "",
    imgUrl:
      "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
    id: "1",
  },
  // {
  //   front: "Hacer",
  //   back: "Do",
  //   audioUrl: "",
  //   imgUrl:
  //     "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
  //   id: "2",
  // },
  // {
  //   front: "Hacer",
  //   back: "Do",
  //   audioUrl: "",
  //   imgUrl:
  //     "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg",
  //   id: "3",
  // },
];

const Card = ({}) => {
  const [isFlipped, setFlip] = useState(false);

  const image =
    "https://daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg";

  return (
    <div className="mt-5 flex flex-col items-center space-y-24 px-24">
      <div className="stack">
        {sessionCards.map((el) => (
          <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
            <CardBody
              {...el}
              setFlip={() => setFlip(!isFlipped)}
              isFront={true}
            />
            <CardBody {...el} setFlip={() => setFlip(!isFlipped)} />
          </ReactCardFlip>
        ))}
      </div>
      <ControlButtons />
    </div>
  );
};

export default Card;
